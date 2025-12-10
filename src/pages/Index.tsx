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

  const detectGender = (file: File): Promise<'male' | 'female'> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.5 ? 'male' : 'female');
      }, 500);
    });
  };

  const handleBrideUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const gender = await detectGender(file);
    
    if (gender === 'male') {
      toast({
        title: "Ошибка загрузки",
        description: "В поле невесты загружено фото жениха. Пожалуйста, загрузите фото женщины.",
        variant: "destructive",
      });
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
        title: "Ошибка загрузки",
        description: "В поле жениха загружено фото невесты. Пожалуйста, загрузите фото мужчины.",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div 
        className="relative h-[70vh] bg-background flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex items-start justify-center pt-8">
          <div className="relative w-full max-w-2xl aspect-square">
            <img 
              src="https://cdn.poehali.dev/projects/8ef30259-3f03-48a0-9e3b-c6a8258072d4/files/e3a91e57-af3a-4a19-b77c-cc96b07f7c92.jpg"
              alt="Лариса Гузеева"
              className="absolute inset-0 w-full h-full object-cover animate-[talking_1s_ease-in-out_infinite]"
            />
            <img 
              src="https://cdn.poehali.dev/projects/8ef30259-3f03-48a0-9e3b-c6a8258072d4/files/245a7786-5245-4119-91b0-d7f75ef5a54d.jpg"
              alt="Лариса Гузеева говорит"
              className="absolute inset-0 w-full h-full object-cover animate-[talking-reverse_1s_ease-in-out_infinite]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8 flex items-center justify-center gap-4">
            <Icon name="Sparkles" className="text-primary animate-pulse" size={48} />
            <Icon name="Crown" className="text-primary" size={56} />
            <Icon name="Sparkles" className="text-primary animate-pulse" size={48} />
          </div>
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 drop-shadow-2xl tracking-wider">
            💎 ДАВАЙ ПОЖЕНИМ! 💎
          </h1>
          <p className="text-3xl md:text-4xl text-primary font-bold tracking-widest drop-shadow-lg mb-2 animate-shimmer bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
            ★ ЭЛИТНЫЙ КЛУБ ЗНАКОМСТВ ★
          </p>
          <p className="text-xl md:text-2xl text-white/95 font-light tracking-[0.3em] drop-shadow-lg uppercase">
            Подбор достойных кандидатов премиум-класса
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-1 w-20 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
            <Icon name="Heart" className="text-primary animate-pulse" size={32} />
            <Icon name="Gem" className="text-primary" size={32} />
            <Icon name="Heart" className="text-primary animate-pulse" size={32} />
            <div className="h-1 w-20 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 border-4 border-primary shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] transition-all duration-300 animate-scale-in bg-gradient-to-br from-card via-card to-primary/5">
            <div className="text-center mb-6">
              <div className="inline-block p-5 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-xl animate-pulse">
                <Icon name="Crown" className="text-white" size={56} />
              </div>
              <h2 className="text-5xl font-bold text-secondary mb-3 tracking-wider">👰 НЕВЕСТА 👰</h2>
              <p className="text-lg font-semibold text-primary uppercase tracking-widest">★ VIP Персона ★</p>
              <p className="text-muted-foreground mt-2">Загрузите фотографию невесты</p>
            </div>

            <div className="space-y-6">
              {bridePhoto ? (
                <div className="relative group">
                  <img 
                    src={bridePhoto} 
                    alt="Невеста" 
                    className="w-full h-80 object-cover rounded-lg border-4 border-primary shadow-xl"
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
                <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-primary rounded-lg cursor-pointer hover:border-primary transition-all hover:bg-primary/10 bg-gradient-to-br from-transparent to-primary/5 shadow-inner">
                  <Icon name="Sparkles" className="text-primary mb-2 animate-pulse" size={40} />
                  <Icon name="Upload" className="text-primary mb-4" size={56} />
                  <span className="text-xl font-bold text-primary uppercase tracking-wider">✨ Нажмите для загрузки ✨</span>
                  <span className="text-sm text-muted-foreground mt-3 font-semibold">⚠️ Принимаются только фото женщин ⚠️</span>
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

          <Card className="p-8 border-4 border-primary shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] transition-all duration-300 animate-scale-in bg-gradient-to-br from-card via-card to-primary/5" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-6">
              <div className="inline-block p-5 bg-gradient-to-br from-secondary to-primary rounded-full mb-4 shadow-xl animate-pulse">
                <Icon name="Users" className="text-white" size={56} />
              </div>
              <h2 className="text-5xl font-bold text-secondary mb-3 tracking-wider">🤵 ЖЕНИХИ 🤵</h2>
              <p className="text-lg font-semibold text-primary uppercase tracking-widest">★ Элитные кандидаты ★</p>
              <p className="text-muted-foreground mt-2">Загрузите фотографии кандидатов</p>
            </div>

            <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-primary rounded-lg cursor-pointer hover:border-primary transition-all hover:bg-primary/10 bg-gradient-to-br from-transparent to-primary/5 shadow-inner">
              <Icon name="Star" className="text-primary mb-2 animate-pulse" size={40} />
              <Icon name="Upload" className="text-primary mb-4" size={56} />
              <span className="text-xl font-bold text-primary uppercase tracking-wider">💫 Добавить кандидата 💫</span>
              <span className="text-sm text-muted-foreground mt-3 font-semibold">⚠️ Принимаются только фото мужчин ⚠️</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleGroomUpload}
              />
            </label>
          </Card>
        </div>

        {groomPhotos.length > 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Icon name="Sparkles" className="text-primary animate-pulse" size={40} />
                <Icon name="Crown" className="text-primary" size={48} />
                <Icon name="Sparkles" className="text-primary animate-pulse" size={40} />
              </div>
              <h2 className="text-6xl font-bold mb-4 text-foreground tracking-wider">👑 ГАЛЕРЕЯ КАНДИДАТОВ 👑</h2>
              <p className="text-2xl font-bold text-primary uppercase tracking-widest mb-4">★ Премиум коллекция ★</p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-1 w-32 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
                <Icon name="Gem" className="text-primary" size={32} />
                <Icon name="Heart" className="text-primary animate-pulse" size={32} />
                <Icon name="Gem" className="text-primary" size={32} />
                <div className="h-1 w-32 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groomPhotos.map((photo, index) => (
                <Card 
                  key={photo.id} 
                  className="overflow-hidden border-4 border-primary hover:border-secondary transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.9)] animate-scale-in group bg-gradient-to-br from-card to-primary/10"
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
                  <div className="p-6 bg-gradient-to-br from-card to-primary/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-secondary tracking-wider">🎩 Кандидат #{index + 1}</h3>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">★ VIP ★</p>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="Star" className="text-primary animate-pulse" size={24} />
                        <Icon name="Heart" className="text-primary" size={24} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-secondary via-primary to-secondary text-secondary-foreground py-12 mt-16 border-t-4 border-primary shadow-[0_-10px_40px_rgba(212,175,55,0.3)]">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Sparkles" className="text-white animate-pulse" size={32} />
            <Icon name="Heart" className="text-white" size={40} />
            <Icon name="Sparkles" className="text-white animate-pulse" size={32} />
          </div>
          <p className="text-2xl font-bold tracking-widest uppercase mb-2">★★★ EXCLUSIVE MATCHMAKING ★★★</p>
          <p className="text-lg font-light tracking-wide">💎 Сделано с любовью для создания элитных счастливых пар 💎</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;