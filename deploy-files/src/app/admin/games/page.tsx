"use client";

import { useState, useEffect } from "react";
import { Game, addGame, getGames, updateGame, deleteGame } from "../../../lib/games";
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">إدارة الألعاب</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingGame(null);
              resetForm();
            }}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة لعبة جديدة
          </button>
        </div>

        {/* Games List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(game.id!)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-2">{game.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">السعر:</span>
                  <span className={game.isFree ? "text-green-400" : "text-white"}>
                    {game.isFree ? 'مجاني' : `${game.price} ريال`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">التقييم:</span>
                  <span className="text-yellow-400">⭐ {game.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">التحميلات:</span>
                  <span className="text-white">{game.downloads || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الحجم:</span>
                  <span className="text-white">{game.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingGame ? 'تعديل اللعبة' : 'إضافة لعبة جديدة'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingGame(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">اسم اللعبة (عربي)</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">اسم اللعبة (إنجليزي)</label>
                      <input
                        type="text"
                        name="titleEn"
                        value={formData.titleEn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف (عربي)</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف (إنجليزي)</label>
                    <textarea
                      name="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رابط الصورة</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">رابط الفيديو</label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الفئة</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="VR">الواقع الافتراضي</option>
                        <option value="PC">ألعاب الكمبيوتر</option>
                        <option value="Mobile">ألعاب الموبايل</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">التقييم</label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الحجم</label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="مثال: 2.5 GB"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر (ريال)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر الأصلي (ريال)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رابط التحميل</label>
                      <input
                        type="url"
                        name="downloadUrl"
                        value={formData.downloadUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary"
                      />
                      <span>لعبة مجانية</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary"
                      />
                      <span>لعبة مميزة</span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
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
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
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