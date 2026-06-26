'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, Trash2, Plus, UploadCloud, X } from 'lucide-react';
import { addGalleryAction, deleteGalleryAction } from '../actions';

export default function GalleryClient({ images }: { images: any[] }) {
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
    formData.set('image', file);
    
    try {
      await addGalleryAction(formData);
      setFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Error adding image");
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
            <ImageIcon className="text-primary" /> Gallery Manager
          </h1>
          <p className="text-muted-foreground mt-2">Manage the masonry gallery images. Drag and drop images to upload.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md sticky top-8">
            <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
              <Plus size={20} /> Add New Image
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Alt Text (Image Name)</label>
                <input required type="text" name="alt" placeholder="e.g. Blood Ruby Core" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Grid Sizing (Tailwind Classes)</label>
                <input required type="text" name="className" defaultValue="col-span-1 row-span-1" placeholder="e.g. md:col-span-2 row-span-2" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
                <p className="text-xs text-muted-foreground mt-2">Use 'md:col-span-2' for wide images, 'row-span-2' for tall images.</p>
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
                {isPending ? 'Uploading...' : 'Add to Gallery'}
              </button>
            </form>
          </div>
        </div>

        {/* Image List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-serif text-white mb-6">Gallery Photos ({images.length})</h2>
            
            {images.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-xl">
                No images in the gallery yet. Upload one!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="group relative bg-black/40 border border-white/5 hover:border-white/20 transition-colors rounded-xl overflow-hidden aspect-square">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <p className="text-white text-xs font-medium truncate">{image.alt}</p>
                      <button onClick={() => deleteGalleryAction(image.id)} className="self-end p-2 bg-red-500/80 text-white hover:bg-red-500 rounded-lg transition-colors backdrop-blur-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
