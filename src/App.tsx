import { Heart, Star, Award as Trophy, GraduationCap, Book, Users, Briefcase, Music, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [fireworks, setFireworks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    particles: Array<{
      angle: number;
      speed: number;
      color: string;
      size: number;
    }>;
  }>>([]);
  const [nextId, setNextId] = useState(0);

  // Gera uma cor aleatória em formato HSL
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
  };

  // Cria um novo fogo de artifício na posição especificada
  const createFirework = (x: number, y: number) => {
    const particleCount = 50 + Math.floor(Math.random() * 50);
    const particles = Array.from({ length: particleCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 3,
      color: getRandomColor(),
      size: 2 + Math.random() * 4
    }));

    const newFirework = {
      id: nextId,
      x,
      y,
      color: getRandomColor(),
      particles
    };

    setNextId(prev => prev + 1);
    setFireworks(prev => [...prev, newFirework]);

    // Remove o fogo de artifício após a animação
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
    }, 2000);
  };

  // Configura o clique na tela para criar fogos de artifício
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };

    // Adiciona o evento de clique
    window.addEventListener('click', handleClick);

    // Limpa o evento quando o componente é desmontado
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [nextId]);

  const handleCelebrate = () => {
    // Abre o player de música se estiver fechado
    if (!isMusicPlayerOpen) {
      setIsMusicPlayerOpen(true);
      setIsPlaying(true);
    }
    
    // Rola suavemente para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Cria múltiplos fogos de artifício na parte superior da tela
    const width = window.innerWidth;
    const count = 5 + Math.floor(Math.random() * 5); // Entre 5 e 10 fogos
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = Math.random() * width * 0.8 + width * 0.1; // 10% a 90% da largura
        createFirework(x, 100); // Posição Y fixa no topo
      }, i * 300); // Espaça os fogos em 300ms
    }
  };
  

  useEffect(() => {
    setIsVisible(true);
    
    // Add animation class to body for page load effect
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  // Player de música
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  const toggleMusicPlayer = () => {
    setIsMusicPlayerOpen(!isMusicPlayerOpen);
    if (!isMusicPlayerOpen) {
      setIsPlaying(true);
    }
  };

  // Event details
  const eventDetails = {
    title: 'Homenagem Especial',
    honoree: 'Professora Doutora Nadia Cheik'
  };

  // Honoree achievements
  const achievements = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Excelência Acadêmica',
      description: 'Doutorado em sua área de atuação com distinção e reconhecimento internacional.'
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: 'Publicações Relevantes',
      description: 'Autora de diversos artigos científicos publicados em periódicos de alto impacto.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Orientação de Alunos',
      description: 'Mentora dedicada, formando gerações de profissionais qualificados.'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Atuação Profissional',
      description: 'Reconhecida por sua contribuição significativa em sua área de atuação.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Poppins'] text-white overflow-x-hidden">
      {/* Custom animations */}
      {/* Efeitos de Partículas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Animações personalizadas */
          @keyframes gradient-xy {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          .animate-gradient-xy {
            background-size: 400% 400%;
            animation: gradient-xy 15s ease infinite;
          }
          
          /* Efeito de brilho suave */
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5); }
            50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.8); }
          }
          
          .glow-pulse {
            animation: glow-pulse 3s ease-in-out infinite;
          }
          
          /* Efeito de flutuação melhorado */
          @keyframes float-bob {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .float-bob {
            animation: float-bob 6s ease-in-out infinite;
          }
          
          /* Efeito de brilho no texto */
          .text-shine {
            background: linear-gradient(
              to right,
              #fff 20%,
              #ec4899 30%,
              #8b5cf6 70%,
              #fff 80%
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 8s linear infinite;
          }
          
          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-30px) rotate(5deg) scale(1.1);
              opacity: 1;
            }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float 6s ease-in-out 1s infinite;
          }
          .animate-fade-in {
            animation: fadeIn 1.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .text-gradient {
            background: linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradient 5s ease infinite;
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-15px) scale(1.05) rotate(1deg);
            box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.3);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .floating {
            animation: floating 6s ease-in-out infinite;
          }
          
          .floating-2 {
            animation: floating 8s ease-in-out 1s infinite;
          }
          
          .floating-3 {
            animation: floating 10s ease-in-out 2s infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          
          .glow {
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
          }
          
          .glow-hover:hover {
            text-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
            transition: text-shadow 0.3s ease;
          }
          @keyframes fall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          @keyframes float-up {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) scale(0.5);
              opacity: 0;
            }
          }
          
          .celebrating {
            animation: pulse 0.5s ease-in-out;
          }
        `
      }} />
      {/* Hero Section */}
      <header className="relative overflow-hidden py-28 md:py-36 shadow-2xl group">
        {/* Efeito de partículas */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={`header-particle-${i}`}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-fuchsia-800 to-pink-700 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 6 + 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-md p-6 rounded-full shadow-2xl transform transition-all duration-500 group-hover:scale-110">
                <Trophy className="w-24 h-24 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 font-['Dancing_Script']">
                {eventDetails.title}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto my-4 rounded-full"></div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-gradient">
                {eventDetails.honoree}
              </h2>
            </div>
            
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-16 border-4 border-white/30 rounded-3xl flex justify-center p-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Honoree Tribute Section */}
        <section className={`mb-24 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-br from-purple-900/80 via-fuchsia-900/80 to-pink-900/80 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10 transform transition-all duration-700 hover:shadow-[0_0_50px_-5px_rgba(139,92,246,0.3)] hover:scale-[1.01]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group w-full md:w-1/3">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-75 blur-lg group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-white/5 backdrop-blur-sm p-1 rounded-3xl overflow-hidden h-full">
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center mx-auto mb-6 overflow-hidden border-4 border-white/20">
                        <img 
                          src="/professora1.png" 
                          alt={eventDetails.honoree}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            const initials = eventDetails.honoree.split(' ').map(n => n[0]).join('');
                            target.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23ec4899%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22110%22%20font-size%3D%2280%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E${initials}%3C%2Ftext%3E%3C%2Fsvg%3E`;
                          }}
                        />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{eventDetails.honoree}</h3>
                      <p className="text-pink-200 font-medium">Homenageada Especial</p>
                      <div className="flex justify-center gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 mt-8 md:mt-0">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                  <span className="text-pink-300 font-medium">Homenagem Especial</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Uma vida dedicada ao conhecimento e à excelência
                </h2>
                
                <div className="prose prose-invert max-w-none text-lg text-white/90 leading-relaxed space-y-6 relative">
                  {/* Animated background elements */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full filter blur-3xl -z-10"></div>
                  <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl -z-10"></div>
                  
                  {/* Animated underline effect */}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-[length:200%_auto] transition-all duration-1000 group-hover:w-full"></div>
        
                  <p className="transform transition-all duration-500 hover:translate-x-2 hover:text-white relative group/p">
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-pink-400 opacity-0 group-hover/p:opacity-100 transition-opacity duration-300">✦</span>
                    É com imensa honra e gratidão que prestamos esta justa homenagem à {eventDetails.honoree}, cuja trajetória profissional e acadêmica tem sido marcada por dedicação, competência e um compromisso inabalável com a excelência.
                  </p>
        
                  <div className="relative p-6 rounded-xl transition-all duration-500 hover:bg-white/5 group/div">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover/div:opacity-100 transition-opacity duration-500 -z-10"></div>
                    <p className="transform transition-all duration-500 group-hover/div:translate-x-2 group-hover/div:text-white">
                      Sua contribuição para nossa instituição e para a formação de tantos profissionais qualificados é inestimável. Seu conhecimento, ética e paixão pelo que faz são verdadeiras inspirações para todos que têm o privilégio de conviver com você.
                    </p>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-500/10 rounded-full filter blur-xl opacity-0 group-hover/div:opacity-100 transition-opacity duration-700"></div>
                  </div>
        
                  <div className="relative group/quote p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-2xl backdrop-blur-sm border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-0 group-hover/quote:opacity-10 blur transition duration-500"></div>
                    <div className="absolute top-4 right-4 text-4xl text-pink-400/20 group-hover/quote:text-pink-400/30 transition-colors duration-500">"</div>
                    <p className="text-2xl font-medium italic text-pink-100 relative transform transition-all duration-500 group-hover/quote:translate-x-2">
                      O conhecimento é a única riqueza que, quanto mais se divide, mais se multiplica.
                    </p>
                    <div className="absolute bottom-2 right-6 text-sm text-pink-300/60">- Provérbio chinês</div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-400/10 rounded-full filter blur-xl group-hover/quote:scale-150 transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Interactive floating elements */}
                  <div className="absolute -top-10 right-0 w-20 h-20 rounded-full bg-pink-500/10 filter blur-xl animate-float"></div>
                  <div className="absolute -bottom-5 left-1/4 w-16 h-16 rounded-full bg-purple-500/10 filter blur-xl animate-float-delay"></div>
                </div>
                
                <div className="mt-12 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <button 
                    onClick={handleCelebrate}
                    className="relative overflow-hidden group/button px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)] transform transition-all duration-300 hover:scale-105 hover:brightness-110"
                    style={{
                      backgroundSize: '200% auto',
                      transition: 'all 0.5s ease',
                      boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundPosition = 'right center';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundPosition = 'left center';
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="group-hover/button:animate-bounce">🎉</span>
                      <span>Celebrar esta conquista</span>
                      <span className="group-hover/button:animate-bounce">✨</span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></span>
                  </button>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-pink-500/30 rounded-full blur-md group-hover:scale-110 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Conquistas e Contribuições
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-xl text-white/80 mt-4 max-w-3xl mx-auto">
              Uma jornada marcada por realizações notáveis e contribuições significativas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-white/80">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Momentos Especiais
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-xl text-white/80 mt-4">Alguns dos momentos marcantes desta trajetória</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className={`group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/20 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: `${item * 100}ms`,
                  animation: isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="flex-grow flex items-center justify-center p-4 relative">
                  <img 
                    src={`/${item}.jpeg`}
                    alt={`Momento Especial ${item}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      maxHeight: '280px',
                      width: 'auto',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto'
                    }}
                    onLoad={(e) => {
                      console.log(`Imagem ${item}.jpeg carregada com sucesso!`);
                      const img = e.target as HTMLImageElement;
                      // Ajusta o tamanho máximo baseado na orientação
                      if (img.naturalWidth > img.naturalHeight) {
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                      } else {
                        img.style.maxHeight = '280px';
                        img.style.width = 'auto';
                      }
                    }}
                    onError={(e) => {
                      console.error(`Erro ao carregar a imagem /${item}.jpeg`);
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231f2937%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22160%22%20font-size%3D%2224%22%20text-anchor%3D%22middle%22%20fill%3D%22%238b5cf6%22%20font-family%3D%22Arial%22%3EMomento%20${item}%3C%2Ftext%3E%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20fill%3D%22%239ca3af%22%20font-family%3D%22Arial%22%3EImagem%20n%C3%A3o%20encontrada%3C%2Ftext%3E%3C%2Fsvg%3E`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="w-full">
                      <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Momento Especial {item}
                      </h3>
                      <div className="h-1 w-10 bg-gradient-to-r from-pink-400 to-purple-400 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"></div>
                      <p className="text-pink-100 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        {new Date().toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Tribute Section */}
        <section className={`mb-24 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient with pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-fuchsia-900/90 to-pink-900/90">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
              
              {/* Animated floating elements */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white/5 backdrop-blur-sm"
                  style={{
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: 0.6
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-10 p-12 md:p-16 lg:p-24">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-8 shadow-2xl transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 glow-hover transition duration-500 transform hover:scale-105 inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                    Nossa Homenagem
                  </span>
                </h2>
                
                <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto my-8 rounded-full"></div>
                
                <div className="prose prose-invert max-w-3xl mx-auto text-lg md:text-xl leading-relaxed space-y-6 mb-12">
                  <p>
                    A {eventDetails.honoree} é uma inspiração para todos nós. Sua dedicação ao ensino, pesquisa e orientação 
                    tem deixado um legado inestimável em nossa instituição e na vida de inúmeros alunos e colegas.
                  </p>
                  
                  <p className="text-2xl font-medium italic text-pink-200">
                    "A educação é a arma mais poderosa que você pode usar para mudar o mundo."
                    <span className="block text-lg mt-2 text-pink-100">- Nelson Mandela</span>
                  </p>
                  
                  <p>
                    Hoje, com imensa gratidão e admiração, reconhecemos sua contribuição excepcional e celebramos 
                    sua trajetória de sucesso e dedicação.
                  </p>
                </div>
                
                
                <div className="relative z-10 flex flex-wrap justify-center gap-6 mb-12 group">
              {/* Efeito de brilho ao redor dos botões */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition duration-500"></div>
                  {['🎉', '🌟', '👏', '💖', '🎓', '🏆'].map((emoji, i) => (
                    <span 
                      key={i}
                      className="text-3xl opacity-80 hover:opacity-100 hover:scale-125 transition-all duration-300"
                      style={{ 
                        animation: `bounce 2s infinite ${i * 0.1}s`,
                        display: 'inline-block'
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Player de Música */}
      <div className="fixed bottom-4 right-4 z-50">
        {isMusicPlayerOpen ? (
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/10 w-80">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Music className="w-5 h-5 text-pink-400" />
                Música de Fundo
              </h3>
              <button 
                onClick={toggleMusicPlayer}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black/50 rounded-lg overflow-hidden">
              <iframe
                ref={playerRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/wkBuVDEn-P4?autoplay=1&mute=0&controls=1&showinfo=0&rel=0"
                title="Música de Fundo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-white/70 text-sm mt-2">
              Música: Meu Abraço - Melim
            </p>
          </div>
        ) : (
          <button
            onClick={toggleMusicPlayer}
            className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg transform transition-all hover:scale-110"
            aria-label="Abrir player de música"
          >
            <Music className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-16 md:py-20 mt-24 overflow-hidden group pb-24 md:pb-20">
        {/* Efeito de brilho no rodapé */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-transparent"></div>
        
        {/* Efeito de partículas no rodapé */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={`footer-particle-${i}`}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        {/* Efeito de brilho no rodapé */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent"></div>
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Obrigado por fazer parte desta jornada
            </h3>
            
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Esta homenagem é um reconhecimento pelo seu trabalho incansável, dedicação e contribuição 
              inestimável para nossa comunidade acadêmica e profissional.
            </p>
            
            {/* Animated floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 20 + 5}px`,
                    height: `${Math.random() * 20 + 5}px`,
                    background: `rgba(${Math.random() > 0.5 ? '255,255,255' : '236, 72, 153'}, ${Math.random() * 0.3 + 0.1})`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: 0.6
                  }}
                ></div>
              ))}
            </div>

            {/* Confetti effect trigger with enhanced animation */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
              <button 
                onClick={handleCelebrate}
                className="relative overflow-hidden group px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-600 hover:to-purple-700"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:animate-bounce">🎉</span>
                  <span>Celebrar!</span>
                  <span className="group-hover:animate-bounce">🎊</span>
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </button>
            </div>
            
            {/* Efeito de fogos de artifício */}
            <div 
              className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
              style={{
                zIndex: 9999,
                background: 'transparent',
                pointerEvents: 'none',
              }}
            >
              {fireworks.map((firework) => (
                <div key={firework.id} className="absolute" style={{ left: firework.x, top: firework.y }}>
                  {firework.particles.map((particle, index) => (
                    <div
                      key={`${firework.id}-${index}`}
                      className="absolute rounded-full"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: particle.color,
                        transform: 'translate(-50%, -50%)',
                        animation: `explode 2s ease-out forwards`,
                        willChange: 'transform, opacity',
                        pointerEvents: 'none',
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        '--angle': `${particle.angle}rad`,
                        '--distance': `${particle.speed * 100}px`,
                      }}
                    />
                  ))}
                </div>
              ))}
              
              <style jsx global>{`
                @keyframes explode {
                  0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                  }
                  100% {
                    transform: 
                      translate(
                        calc(cos(var(--angle)) * var(--distance)), 
                        calc(sin(var(--angle)) * var(--distance))
                      ) 
                      scale(0.1);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/60 text-sm">
                © {currentYear} Homenagem Especial. Todos os direitos reservados.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-white/60 hover:text-pink-300 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-pink-300 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-pink-300 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
