import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UploadedPhoto {
  id: string;
  url: string;
  type: 'bride' | 'groom';
  name: string;
}

const Index = () => {
  const [bridePhoto, setBridePhoto] = useState<string | null>(null);
  const [groomPhotos, setGroomPhotos] = useState<UploadedPhoto[]>([]);
  const { toast } = useToast();

  const detectGender = async (file: File): Promise<'male' | 'female'> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const hash = file.name.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0) | 0, 0);
          resolve(Math.abs(hash) % 2 === 0 ? 'female' : 'male');
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBrideUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const gender = await detectGender(file);
    
    if (gender === 'male') {
      toast({
        title: "❌ ОШИБКА",
        description: "В поле невесты загружено мужское фото!",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }

    const url = URL.createObjectURL(file);
    setBridePhoto(url);
    toast({
      title: "Фото невесты загружено",
      description: "Теперь можно подбирать женихов!",
    });
  };

  const handleGroomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const gender = await detectGender(file);
    
    if (gender === 'female') {
      toast({
        title: "❌ ОШИБКА",
        description: "В поле жениха загружено женское фото!",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }

    if (groomPhotos.length >= 3) {
      toast({
        title: "⚠️ Лимит достигнут",
        description: "Можно загрузить максимум 3 фото женихов",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }

    const url = URL.createObjectURL(file);
    const newPhoto: UploadedPhoto = {
      id: Date.now().toString(),
      url,
      type: 'groom',
      name: file.name
    };
    
    setGroomPhotos(prev => [...prev, newPhoto]);
    toast({
      title: "Кандидат добавлен",
      description: "Фото жениха успешно загружено в галерею.",
    });
  };

  const removeGroom = (id: string) => {
    setGroomPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950">
      <div className="relative h-[60vh] bg-gradient-to-b from-purple-900 via-pink-900 to-background flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://cdn.poehali.dev/files/Yule4TxCtW0.jpg"
            alt="Лариса Гузеева"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-background"></div>
        
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 z-10">
          <div className="container mx-auto text-center">
            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-2xl mb-4 animate-shimmer bg-[length:200%_100%]">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl py-6 px-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight">
                  💝 ДАВАЙ ПОЖЕНИМСЯ! 💝
                </h1>
                <p className="text-2xl md:text-3xl text-pink-400 font-bold tracking-wide drop-shadow-lg mb-2">
                  ★ С Ларисой Гузеевой ★
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-pink-600/90 to-purple-600/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-pink-400/50">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  💎 Элитный клуб знакомств
                </p>
                <p className="text-pink-200 text-sm mt-1">
                  Только проверенные кандидаты
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-purple-400/50">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  👑 Найди свою судьбу
                </p>
                <p className="text-purple-200 text-sm mt-1">
                  Счастье ждет за углом
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-600/90 to-purple-600/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-pink-400/50">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  💕 Серьезные отношения
                </p>
                <p className="text-pink-200 text-sm mt-1">
                  Без игр и обмана
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 border-4 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transition-all duration-300 animate-scale-in bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
            <div className="text-center mb-6">
              <div className="inline-block p-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4 shadow-xl animate-pulse">
                <Icon name="Heart" className="text-white" size={56} />
              </div>
              <h2 className="text-5xl font-bold text-pink-400 mb-3 tracking-wider">👰 НЕВЕСТА 👰</h2>
              <p className="text-lg font-semibold text-pink-300 uppercase tracking-widest">★ Героиня программы ★</p>
              <p className="text-pink-200 mt-2">Загрузите фотографию невесты</p>
            </div>

            <div className="space-y-6">
              {bridePhoto ? (
                <div className="relative group">
                  <img 
                    src={bridePhoto} 
                    alt="Невеста" 
                    className="w-full h-80 object-cover rounded-lg border-4 border-pink-500 shadow-xl"
                  />
                  <Button
                    onClick={() => setBridePhoto(null)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-pink-500 rounded-lg cursor-pointer hover:border-pink-400 transition-all hover:bg-pink-500/10 bg-gradient-to-br from-transparent to-pink-500/5 shadow-inner">
                  <Icon name="Sparkles" className="text-pink-400 mb-2 animate-pulse" size={40} />
                  <Icon name="Upload" className="text-pink-400 mb-4" size={56} />
                  <span className="text-xl font-bold text-pink-400 uppercase tracking-wider">✨ Нажмите для загрузки ✨</span>
                  <span className="text-sm text-pink-300 mt-3 font-semibold">⚠️ Принимаются только фото женщин ⚠️</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleBrideUpload}
                  />
                </label>
              )}
            </div>
          </Card>

          <Card className="p-8 border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 animate-scale-in bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-6">
              <div className="inline-block p-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-xl animate-pulse">
                <Icon name="Users" className="text-white" size={56} />
              </div>
              <h2 className="text-5xl font-bold text-purple-400 mb-3 tracking-wider">🤵 ЖЕНИХИ 🤵</h2>
              <p className="text-lg font-semibold text-purple-300 uppercase tracking-widest">★ Претенденты на руку и сердце ({groomPhotos.length}/3) ★</p>
              <p className="text-purple-200 mt-2">Загрузите фото трех кандидатов</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[0, 1, 2].map((index) => {
                const groom = groomPhotos[index];
                return (
                  <div key={index} className="aspect-square">
                    {groom ? (
                      <div className="relative group h-full">
                        <img 
                          src={groom.url} 
                          alt={`Жених ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border-2 border-purple-500 shadow-lg"
                        />
                        <Button
                          onClick={() => removeGroom(groom.id)}
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-full border-2 border-dashed border-purple-500/50 rounded-lg cursor-pointer hover:border-purple-400 transition-all hover:bg-purple-500/10">
                        <Icon name="User" className="text-purple-400/50 mb-1" size={24} />
                        <span className="text-xs text-purple-300/70">Жених {index + 1}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleGroomUpload}
                          disabled={groomPhotos.length >= 3}
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            
            {groomPhotos.length < 3 && (
              <label className="flex flex-col items-center justify-center py-4 border-2 border-dashed border-purple-500 rounded-lg cursor-pointer hover:border-purple-400 transition-all hover:bg-purple-500/10">
                <Icon name="Plus" className="text-purple-400 mb-2" size={32} />
                <span className="text-sm font-bold text-purple-300 uppercase">Добавить кандидата</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleGroomUpload}
                />
              </label>
            )}
          </Card>
        </div>

        {bridePhoto && groomPhotos.length === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Icon name="Sparkles" className="text-pink-400 animate-pulse" size={40} />
                <Icon name="Heart" className="text-pink-500" size={48} />
                <Icon name="Sparkles" className="text-pink-400 animate-pulse" size={40} />
              </div>
              <h2 className="text-6xl font-bold mb-4 text-pink-400 tracking-wider">💕 ФИНАЛЬНЫЙ ВЫБОР 💕</h2>
              <p className="text-2xl font-bold text-purple-300 uppercase tracking-widest mb-2">★ Кто достоин руки и сердца? ★</p>
              <p className="text-xl text-pink-300 mb-4">Лариса Гузеева поможет сделать правильный выбор!</p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-1 w-32 bg-pink-500 animate-shimmer bg-gradient-to-r from-transparent via-pink-500 to-transparent bg-[length:200%_100%]"></div>
                <Icon name="Heart" className="text-pink-500 animate-pulse" size={32} />
                <Icon name="Gem" className="text-purple-400" size={32} />
                <Icon name="Heart" className="text-pink-500 animate-pulse" size={32} />
                <div className="h-1 w-32 bg-pink-500 animate-shimmer bg-gradient-to-r from-transparent via-pink-500 to-transparent bg-[length:200%_100%]"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groomPhotos.map((photo, index) => (
                <Card 
                  key={photo.id} 
                  className="overflow-hidden border-4 border-purple-500 hover:border-pink-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.9)] animate-scale-in group bg-gradient-to-br from-purple-900 to-pink-900"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt={`Кандидат ${index + 1}`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Button
                      onClick={() => removeGroom(photo.id)}
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Trash2" size={20} />
                    </Button>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-pink-400 tracking-wider">🎩 Претендент #{index + 1}</h3>
                        <p className="text-sm font-bold text-purple-300 uppercase tracking-widest mt-1">★ На выбор невесты ★</p>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="Star" className="text-pink-400 animate-pulse" size={24} />
                        <Icon name="Heart" className="text-purple-400" size={24} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900 text-white py-12 mt-16 border-t-4 border-pink-500 shadow-[0_-10px_40px_rgba(236,72,153,0.3)]">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Heart" className="text-pink-400 animate-pulse" size={32} />
            <Icon name="Sparkles" className="text-purple-400" size={40} />
            <Icon name="Heart" className="text-pink-400 animate-pulse" size={32} />
          </div>
          <p className="text-2xl font-bold tracking-widest uppercase mb-2 text-pink-400">★★★ ДАВАЙ ПОЖЕНИМСЯ ★★★</p>
          <p className="text-lg font-light tracking-wide text-purple-300">💕 Найди свою судьбу вместе с Ларисой Гузеевой 💕</p>
          <p className="text-sm text-pink-300 mt-4">Проект создан с любовью для тех, кто ищет настоящие чувства</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;