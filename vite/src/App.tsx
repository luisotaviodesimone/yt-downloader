import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Download, Plus, X, Youtube, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

// Schema de validação para URLs do YouTube
const youtubeUrlSchema = z.object({
  urls: z.array(
    z.object({
      url: z.string()
        .min(1, 'URL é obrigatória')
        .refine(
          (url) => {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)[a-zA-Z0-9_-]{11}/
            return youtubeRegex.test(url)
          },
          'URL deve ser um link válido do YouTube'
        )
    })
  ).min(1, 'Pelo menos uma URL é obrigatória')
})

type FormData = z.infer<typeof youtubeUrlSchema>

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(youtubeUrlSchema),
    defaultValues: {
      urls: [{ url: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'urls'
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setDownloadStatus('idle')

    try {
      const urlsArray = data.urls.map(item => item.url)
      
      const response = await fetch('http://localhost:8000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsArray }),
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      setDownloadStatus('success')
      toast.success('Download iniciado com sucesso!', {
        icon: '🎉',
        duration: 4000,
      })

      // Reset form after successful submission
      reset({ urls: [{ url: '' }] })

    } catch (error) {
      setDownloadStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      toast.error(`Erro ao iniciar download: ${errorMessage}`, {
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addUrlField = () => {
    append({ url: '' })
  }

  const removeUrlField = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <Youtube className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Downloader
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Adicione uma ou mais URLs de vídeos do YouTube para fazer o download. 
            Nossa ferramenta processa seus vídeos de forma rápida e segura.
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* URL Fields */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  URLs dos Vídeos do YouTube
                </label>
                
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          {...register(`urls.${index}.url`)}
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                            errors.urls?.[index]?.url
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-red-300'
                          }`}
                        />
                        {errors.urls?.[index]?.url && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.urls[index]?.url?.message}
                          </p>
                        )}
                      </div>
                      
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUrlField(index)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remover URL"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add URL Button */}
                <button
                  type="button"
                  onClick={addUrlField}
                  className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar mais uma URL
                </button>

                {/* General URL errors */}
                {errors.urls?.message && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.urls.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : downloadStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : downloadStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-red-600 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : downloadStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Download Iniciado!
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Iniciar Download
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-blue-600 font-semibold text-sm">✨ Múltiplos Vídeos</div>
              <div className="text-blue-800 text-xs mt-1">Adicione várias URLs de uma só vez</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-green-600 font-semibold text-sm">🚀 Processamento Rápido</div>
              <div className="text-green-800 text-xs mt-1">Downloads otimizados e seguros</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-purple-600 font-semibold text-sm">📱 Interface Amigável</div>
              <div className="text-purple-800 text-xs mt-1">Design responsivo e intuitivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  )
}

export default App
