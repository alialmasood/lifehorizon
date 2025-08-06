"use client";

import { useState, useEffect } from "react";
import { Game, addGame, getGames, updateGame, deleteGame } from "@/lib/games";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    image: "",
    videoUrl: "",
    downloadUrl: "",
    category: "VR",
    rating: 4.5,
    size: "",
    price: 0,
    originalPrice: 0,
    isFree: false,
    isFeatured: false
  });

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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingGame) {
        await updateGame(editingGame.id!, formData);
        alert('تم تحديث اللعبة بنجاح!');
      } else {
        await addGame(formData);
        alert('تم إضافة اللعبة بنجاح!');
      }
      
      setShowForm(false);
      setEditingGame(null);
      resetForm();
      await loadGames();
    } catch (error) {
      console.error('خطأ في حفظ اللعبة:', error);
      alert('حدث خطأ في حفظ اللعبة');
    }
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      titleEn: game.titleEn || "",
      description: game.description,
      descriptionEn: game.descriptionEn || "",
      image: game.image,
      videoUrl: game.videoUrl,
      downloadUrl: game.downloadUrl,
      category: game.category,
      rating: game.rating,
      size: game.size,
      price: game.price,
      originalPrice: game.originalPrice || 0,
      isFree: game.isFree,
      isFeatured: game.isFeatured
    });
    setShowForm(true);
  };

  const handleDelete = async (gameId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه اللعبة؟')) {
      try {
        await deleteGame(gameId);
        alert('تم حذف اللعبة بنجاح!');
        await loadGames();
      } catch (error) {
        console.error('خطأ في حذف اللعبة:', error);
        alert('حدث خطأ في حذف اللعبة');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      image: "",
      videoUrl: "",
      downloadUrl: "",
      category: "VR",
      rating: 4.5,
      size: "",
      price: 0,
      originalPrice: 0,
      isFree: false,
      isFeatured: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseFloat(value) : value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">إدارة الألعاب</h1>
            <p className="text-gray-300">إضافة وتعديل وحذف الألعاب في المتجر</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              العودة للرئيسية
            </a>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              إضافة لعبة جديدة
            </button>
          </div>
        </div>

        {/* Games List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 border border-gray-600">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">لا توجد ألعاب</h3>
                <p className="text-gray-300 mb-6">لم يتم إضافة أي ألعاب بعد. ابدأ بإضافة لعبة جديدة!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  إضافة أول لعبة
                </button>
              </div>
            </div>
          ) : (
            games.map((game) => (
              <div key={game.id} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(game)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-200"
                      title="تعديل"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(game.id!)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors duration-200"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-2 text-sm">{game.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">السعر:</span>
                    <span className={`font-semibold ${game.isFree ? "text-green-400" : "text-yellow-400"}`}>
                      {game.isFree ? 'مجاني' : `${game.price} دينار`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">التقييم:</span>
                    <span className="text-yellow-400 font-semibold">⭐ {game.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">التحميلات:</span>
                    <span className="text-white font-semibold">{game.downloads || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">الحجم:</span>
                    <span className="text-white font-semibold">{game.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">الفئة:</span>
                    <span className="text-blue-400 font-semibold">{game.category}</span>
                  </div>
                  {game.isFeatured && (
                    <div className="flex justify-center">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        مميزة
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-600">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    {editingGame ? 'تعديل اللعبة' : 'إضافة لعبة جديدة'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingGame(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">اسم اللعبة (عربي) *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="أدخل اسم اللعبة بالعربية"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">اسم اللعبة (إنجليزي)</label>
                      <input
                        type="text"
                        name="titleEn"
                        value={formData.titleEn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter game name in English"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-200">الوصف (عربي) *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="أدخل وصف اللعبة باللغة العربية"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-200">الوصف (إنجليزي)</label>
                    <textarea
                      name="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter game description in English"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">رابط الصورة *</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                        placeholder="https://example.com/game-image.jpg"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">رابط الفيديو *</label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        required
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">الفئة</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="VR">الواقع الافتراضي</option>
                        <option value="PC">ألعاب الكمبيوتر</option>
                        <option value="Mobile">ألعاب الموبايل</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">التقييم</label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="4.5"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">الحجم</label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="مثال: 2.5 GB"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر (دينار عراقي)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="مثال: 5000"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر الأصلي (دينار عراقي)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="مثال: 7500"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-200">رابط التحميل</label>
                      <input
                        type="url"
                        name="downloadUrl"
                        value={formData.downloadUrl}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-200 font-medium">لعبة مجانية</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-200 font-medium">لعبة مميزة</span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      {editingGame ? 'تحديث اللعبة' : 'إضافة اللعبة'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingGame(null);
                        resetForm();
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 