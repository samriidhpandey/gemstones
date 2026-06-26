'use client';

import { useState, useRef } from 'react';
import { Package, Trash2, Plus, UploadCloud, X } from 'lucide-react';
import { addProductAction, deleteProductAction } from '../actions';

export default function ProductsClient({ products }: { products: any[] }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('Please upload an image');
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set('image', file); // Inject the file into FormData
    
    try {
      await addProductAction(formData);
      setFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <Package className="text-primary" /> Featured Gemstones
          </h1>
          <p className="text-muted-foreground mt-2">Manage the gemstones shown on the home page. Drag and drop images to upload.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md sticky top-8">
            <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
              <Plus size={20} /> Add New Gemstone
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Gemstone Name</label>
                <input required type="text" name="name" placeholder="e.g. Imperial Ruby" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Price</label>
                <input required type="text" name="price" placeholder="e.g. ₹85,000" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              
              {/* Drag and Drop Zone */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Upload Image</label>
                <div 
                  className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                    dragActive ? 'border-primary bg-primary/10' : 'border-white/20 bg-black/50 hover:bg-black/30 hover:border-white/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
                  
                  {file ? (
                    <div className="text-center">
                      <div className="relative inline-block">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="h-24 object-cover rounded-md mb-2 border border-white/10" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-primary truncate max-w-[200px]">{file.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <UploadCloud size={32} className="mb-2 opacity-70" />
                      <p className="text-sm font-medium text-white mb-1">Click or drag image here</p>
                      <p className="text-xs">JPEG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <button disabled={isPending} type="submit" className="w-full bg-primary text-black font-semibold rounded-lg p-3 mt-4 hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isPending ? 'Uploading...' : 'Add to Store'}
              </button>
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-serif text-white mb-6">Current Inventory ({products.length})</h2>
            
            {products.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-xl">
                No gemstones in the database yet. Add one from the sidebar!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="group relative bg-black/40 border border-white/5 hover:border-white/20 transition-colors rounded-xl p-4 flex gap-4 items-center">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-black/50" />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-primary text-sm">{product.price}</p>
                    </div>
                    <button onClick={() => deleteProductAction(product.id)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
