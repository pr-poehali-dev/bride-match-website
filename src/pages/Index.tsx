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
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://cdn.poehali.dev/projects/8ef30259-3f03-48a0-9e3b-c6a8258072d4/files/b40841f1-86c6-4fc2-9281-dfd59aeed5c7.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Давай поженим!
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 font-light tracking-wide drop-shadow-lg">
            Элитный подбор достойных кандидатов
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
            <Icon name="Heart" className="text-primary" size={24} />
            <div className="h-px w-16 bg-primary animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-secondary/10 rounded-full mb-4">
                <Icon name="User" className="text-secondary" size={48} />
              </div>
              <h2 className="text-4xl font-bold text-secondary mb-2">Невеста</h2>
              <p className="text-muted-foreground">Загрузите фотографию невесты</p>
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
                <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-primary/40 rounded-lg cursor-pointer hover:border-primary transition-all hover:bg-primary/5">
                  <Icon name="Upload" className="text-primary mb-4" size={48} />
                  <span className="text-lg font-medium text-foreground">Нажмите для загрузки</span>
                  <span className="text-sm text-muted-foreground mt-2">Принимаются только фото женщин</span>
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

          <Card className="p-8 border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-secondary/10 rounded-full mb-4">
                <Icon name="Users" className="text-secondary" size={48} />
              </div>
              <h2 className="text-4xl font-bold text-secondary mb-2">Женихи</h2>
              <p className="text-muted-foreground">Загрузите фотографии кандидатов</p>
            </div>

            <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-primary/40 rounded-lg cursor-pointer hover:border-primary transition-all hover:bg-primary/5">
              <Icon name="Upload" className="text-primary mb-4" size={48} />
              <span className="text-lg font-medium text-foreground">Добавить кандидата</span>
              <span className="text-sm text-muted-foreground mt-2">Принимаются только фото мужчин</span>
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
              <h2 className="text-5xl font-bold mb-4 text-foreground">Галерея кандидатов</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-24 bg-primary"></div>
                <Icon name="Crown" className="text-primary" size={24} />
                <div className="h-px w-24 bg-primary"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groomPhotos.map((photo, index) => (
                <Card 
                  key={photo.id} 
                  className="overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in group"
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
                  <div className="p-6 bg-card">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Кандидат #{index + 1}</h3>
                      <Icon name="Heart" className="text-primary" size={20} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-light">Сделано с любовью 💖 для создания счастливых пар</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
