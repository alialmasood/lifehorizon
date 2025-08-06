"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, Info, Play, ShoppingCart } from "lucide-react";
import { Game, getGames, incrementDownloads } from "@/lib/games";

export default function GameStorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await getGames();
      setGames(gamesData);
    } catch (error) {
      console.error('خطأ في تحميل الألعاب:', error);
      // إذا لم تكن هناك ألعاب في Firebase، استخدم البيانات الافتراضية
      setGames(defaultGames);
    } finally {
      setLoading(false);
    }
  };

  const handleGameInfo = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handlePurchase = (game: Game) => {
    // حساب المبلغ الإجمالي (سعر اللعبة + رسوم المعاملة)
    const totalAmount = game.isFree ? 0 : game.price + 1000;
    
    // بناء رابط صفحة checkout مع البيانات
    const checkoutUrl = new URL('/payment/checkout', window.location.origin);
    checkoutUrl.searchParams.set('amount', totalAmount.toString());
    checkoutUrl.searchParams.set('game_id', game.id!);
    checkoutUrl.searchParams.set('game_title', encodeURIComponent(game.title));
    
    console.log('التوجيه إلى صفحة الدفع:', checkoutUrl.toString());
    
    // توجيه مباشر إلى صفحة checkout
    window.location.href = checkoutUrl.toString();
  };

  const handlePurchaseSuccess = async () => {
    if (selectedGame) {
      // زيادة عدد التحميلات
      await incrementDownloads(selectedGame.id!);
      // إعادة تحميل الألعاب لتحديث البيانات
      await loadGames();
    }
  };

  const handleDownload = async (game: Game) => {
    try {
      // زيادة عدد التحميلات
      await incrementDownloads(game.id!);
      
      // فتح رابط التحميل
      if (game.downloadUrl && game.downloadUrl !== '#') {
        window.open(game.downloadUrl, '_blank');
      } else {
        alert('رابط التحميل غير متوفر حالياً');
      }
    } catch (error) {
      console.error('خطأ في التحميل:', error);
      alert('حدث خطأ في التحميل');
    }
  };

  // البيانات الافتراضية للألعاب
  const defaultGames: Game[] = [
    {
      id: "beat-saber",
      title: "Beat Saber",
      description: "لعبة الواقع الافتراضي الأكثر شعبية في العالم. اقطع المكعبات بالموسيقى!",
      image: "/images/games/beat-saber.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.8,
      size: "2.5 GB",
      price: 0,
      isFree: true,
      isFeatured: true,
      downloads: 0
    },
    {
      id: "superhot-vr",
      title: "Superhot VR",
      description: "الوقت يتحرك فقط عندما تتحرك. لعبة إطلاق نار فريدة من نوعها.",
      image: "/images/games/superhot-vr.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.6,
      size: "3.1 GB",
      price: 150,
      isFree: false,
      isFeatured: true,
      downloads: 0
    },
    {
      id: "walking-dead-vr",
      title: "The Walking Dead: Saints & Sinners",
      description: "تجربة البقاء على قيد الحياة في عالم الزومبي المروع.",
      image: "/images/games/walking-dead-vr.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.7,
      size: "8.2 GB",
      price: 200,
      isFree: false,
      isFeatured: true,
      downloads: 0
    },
    {
      id: "pavlov-vr",
      title: "Pavlov VR",
      description: "محاكاة إطلاق النار المتعددة اللاعبين للواقع الافتراضي.",
      image: "/images/games/pavlov-vr.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.5,
      size: "4.8 GB",
      price: 0,
      isFree: true,
      isFeatured: false,
      downloads: 0
    },
    {
      id: "job-simulator",
      title: "Job Simulator",
      description: "محاكاة الوظائف في المستقبل بطريقة مضحكة وممتعة.",
      image: "/images/games/job-simulator.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.4,
      size: "2.1 GB",
      price: 100,
      isFree: false,
      isFeatured: false,
      downloads: 0
    },
    {
      id: "vader-immortal",
      title: "Vader Immortal",
      description: "تجربة Star Wars غامرة في الواقع الافتراضي.",
      image: "/images/games/vader-immortal.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SaAGkgtUvrc",
      downloadUrl: "#",
      category: "VR",
      rating: 4.9,
      size: "5.3 GB",
      price: 250,
      isFree: false,
      isFeatured: true,
      downloads: 0
    }
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري تحميل الألعاب...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            مركز الألعاب
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من الألعاب الرائعة للواقع الافتراضي والكمبيوتر
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              الواقع الافتراضي
            </span>
            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
              ألعاب مجانية
            </span>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              أحدث الإصدارات
            </span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                {/* Game Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300/374151/FFFFFF?text=Game+Image";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs text-white font-medium">{game.category}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs text-black font-bold">⭐ {game.rating}</span>
                  </div>
                  {game.isFeatured && (
                    <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs text-white font-bold">مميز</span>
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>
                  
                  {/* Game Stats */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span>الحجم: {game.size}</span>
                    <span className="text-green-400 font-bold">
                      {game.isFree ? 'مجاني' : `${game.price} دينار عراقي`}
                    </span>
                  </div>

                  {/* Downloads Count */}
                  <div className="text-xs text-gray-500 mb-4">
                    تم التحميل {game.downloads || 0} مرة
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePurchase(game)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {game.isFree ? 'تحميل مجاني' : 'شراء'}
                    </button>
                    <button
                      onClick={() => handleGameInfo(game)}
                      className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors"
                      title="معلومات اللعبة"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Info Modal */}
      {showModal && selectedGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Modal Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400/374151/FFFFFF?text=Game+Image";
                  }}
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedGame.title}</h2>
                <p className="text-gray-300 mb-6">{selectedGame.description}</p>

                {/* Game Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <span className="text-gray-400 text-sm">التقييم</span>
                    <div className="text-white font-bold">⭐ {selectedGame.rating}/5</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <span className="text-gray-400 text-sm">الحجم</span>
                    <div className="text-white font-bold">{selectedGame.size}</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <span className="text-gray-400 text-sm">الفئة</span>
                    <div className="text-white font-bold">{selectedGame.category}</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <span className="text-gray-400 text-sm">السعر</span>
                    <div className="text-green-400 font-bold">
                      {selectedGame.isFree ? 'مجاني' : `${selectedGame.price} دينار عراقي`}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handlePurchase(selectedGame);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {selectedGame.isFree ? 'تحميل مجاني' : 'شراء اللعبة'}
                  </button>
                  <a
                    href={selectedGame.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    مشاهدة الفيديو
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 