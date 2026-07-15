import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Save, 
  Image as ImageIcon, 
  Loader2,
  Package,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isNewArrival, setIsNewArrival] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Certifique-se de que o bucket "products" existe e é público.');
    } finally {
      setUploading(false);
    }
  };

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setSizes('');
    setColors('');
    setInStock(true);
    setIsActive(true);
    setIsNewArrival(false);
    setEditingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.image_url);
    setCategory(product.category);
    setSizes(product.sizes.join(', '));
    setColors(product.colors.join(', '));
    setInStock(product.in_stock);
    setIsActive(product.is_active !== false); // Default to true if undefined
    setIsNewArrival(product.is_new_arrival || false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Por favor, faça upload de uma imagem ou insira uma URL.');
      return;
    }

    setFormLoading(true);

    const productData = {
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
      category,
      sizes: sizes.split(',').map(s => s.trim()).filter(s => s),
      colors: colors.split(',').map(c => c.trim()).filter(c => c),
      in_stock: inStock,
      is_active: isActive,
      is_new_arrival: isNewArrival,
    };

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        navigate('/admin/login');
        return;
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) {
          console.error('Erro detalhado do Supabase (Update):', error);
          throw new Error(`Erro ao atualizar: ${error.message}. Verifique se as colunas 'is_active' e 'is_new_arrival' existem na tabela 'products'.`);
        }
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) {
          console.error('Erro detalhado do Supabase (Insert):', error);
          throw new Error(`Erro ao inserir: ${error.message}. Verifique se as colunas 'is_active' e 'is_new_arrival' existem na tabela 'products'.`);
        }
      }

      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err);
      alert(err.message || 'Erro inesperado ao salvar produto.');
    } finally {
      setFormLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-black uppercase tracking-widest">Painel Administrativo</h1>
            <p className="text-gray-500 mt-1 font-light">Gerencie seu catálogo de produtos</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg"
            >
              <Plus size={20} />
              Novo Produto
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-gray-600 px-4 py-3 rounded-lg font-medium hover:text-red-600 transition-all border border-gray-200"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total de Produtos</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Produto</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Preço</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Estoque</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-light italic">
                      Nenhum produto cadastrado no momento.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-12 h-16 object-cover rounded-lg shadow-sm"
                          />
                          <div>
                            <p className="font-bold text-black uppercase tracking-wide text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500 font-light mt-0.5 truncate max-w-[200px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-black">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">{product.in_stock ? 'Em estoque' : 'Indisponível'}</span>
                          </div>
                          {product.is_active === false && (
                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">● Pausado (Oculto)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-gray-400 hover:text-gold transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-serif font-bold uppercase tracking-widest">
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">Preencha as informações detalhadas do item</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Nome do Produto</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      placeholder="Ex: Conjunto Alfaiataria"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      placeholder="Ex: 299.90"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Descrição</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
                    placeholder="Descreva os detalhes da peça..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</label>
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-white"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Conjuntos">Conjuntos</option>
                      <option value="Vestidos">Vestidos</option>
                      <option value="Blusas">Blusas</option>
                      <option value="Calças">Calças</option>
                      <option value="Saias">Saias</option>
                      <option value="Acessórios">Acessórios</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Status do Estoque</label>
                    <div className="flex items-center gap-4 py-3">
                      <button
                        type="button"
                        onClick={() => setInStock(!inStock)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${inStock ? 'bg-green-500' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className="text-sm text-gray-600 font-medium">{inStock ? 'Em estoque' : 'Esgotado'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Exibir na Loja</label>
                    <div className="flex items-center gap-4 py-3">
                      <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isActive ? 'bg-black' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className="text-sm text-gray-600 font-medium">{isActive ? 'Ativado' : 'Pausado (Oculto)'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Lançamento</label>
                    <div className="flex items-center gap-4 py-3">
                      <button
                        type="button"
                        onClick={() => setIsNewArrival(!isNewArrival)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isNewArrival ? 'bg-gold' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isNewArrival ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className="text-sm text-gray-600 font-medium">{isNewArrival ? 'Sim' : 'Não'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Imagem do Produto</label>
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className={`flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                            uploading 
                              ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                              : 'bg-white border-gray-200 hover:border-gold hover:bg-gold/5'
                          }`}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="animate-spin text-gold" size={24} />
                              <span className="text-sm font-medium text-gray-500">Fazendo upload...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="text-gray-400" size={24} />
                              <div className="text-center">
                                <p className="text-sm font-bold text-black uppercase tracking-wider">Clique para selecionar imagem</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">PNG, JPG ou WEBP (Max 5MB)</p>
                              </div>
                            </>
                          )}
                        </label>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-xs font-bold text-gray-400">URL</span>
                        </div>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-xs"
                          placeholder="Ou cole uma URL externa aqui..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Tamanhos (separados por vírgula)</label>
                    <input
                      type="text"
                      value={sizes}
                      onChange={(e) => setSizes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      placeholder="Ex: P, M, G"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Cores (separados por vírgula)</label>
                    <input
                      type="text"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      placeholder="Ex: Preto, Off-White"
                    />
                  </div>
                </div>

                {/* Preview Image */}
                {imageUrl && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-20 h-28 object-cover rounded-lg shadow-sm bg-white"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Preview da Imagem</p>
                      <p className="text-[10px] text-gray-400 font-light truncate max-w-[200px]">{imageUrl}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl hover:shadow-gold/20"
                  >
                    {formLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {editingProduct ? 'Atualizar Produto' : 'Salvar Produto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
