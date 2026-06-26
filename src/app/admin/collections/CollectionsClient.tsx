'use client';

import { useState, useRef } from 'react';
import { ShoppingBag, Trash2, Plus, UploadCloud, X, Film } from 'lucide-react';
import { addCollectionAction, deleteCollectionAction } from '../actions';

export default function CollectionsClient({ items }: { items: any[] }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const [dragActiveImage, setDragActiveImage] = useState(false);
  const [dragActiveVideo, setDragActiveVideo] = useState(false);
  
  const [isPending, setIsPending] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Handlers for Image
  const handleDragImage = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveImage(true);
    else if (e.type === "dragleave") setDragActiveImage(false);
  };
  const handleDropImage = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActiveImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setImageFile(e.dataTransfer.files[0]);
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  // Handlers for Video
  const handleDragVideo = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveVideo(true);
    else if (e.type === "dragleave") setDragActiveVideo(false);
  };
  const handleDropVideo = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActiveVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setVideoFile(e.dataTransfer.files[0]);
  };
  const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) return alert('Please upload a main image');
    
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set('image', imageFile);
    if (videoFile) formData.set('video', videoFile);
    
    try {
      await addCollectionAction(formData);
      setImageFile(null);
      setVideoFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Error adding collection item");
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
            <ShoppingBag className="text-primary" /> Full Collections Catalog
          </h1>
          <p className="text-muted-foreground mt-2">Manage your detailed e-commerce products with videos and descriptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md sticky top-8">
            <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
              <Plus size={20} /> Add New Catalog Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Product Name</label>
                <input required type="text" name="name" placeholder="e.g. The Elysium Diamond" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Price</label>
                <input required type="text" name="price" placeholder="e.g. ₹2,50,000" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Detailed Description</label>
                <textarea required name="description" rows={3} placeholder="Describe the cut, clarity, and origin..." className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors resize-none"></textarea>
              </div>
              
              {/* Image Drag and Drop */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Main Photo <span className="text-red-500">*</span></label>
                <div 
                  className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                    dragActiveImage ? 'border-primary bg-primary/10' : 'border-white/20 bg-black/50 hover:bg-black/30 hover:border-white/40'
                  }`}
                  onDragEnter={handleDragImage} onDragLeave={handleDragImage} onDragOver={handleDragImage} onDrop={handleDropImage} onClick={() => imageInputRef.current?.click()}
                >
                  <input ref={imageInputRef} type="file" accept="image/*" onChange={handleChangeImage} className="hidden" />
                  {imageFile ? (
                    <div className="text-center">
                      <div className="relative inline-block">
                        <img src={URL.createObjectURL(imageFile)} alt="Preview" className="h-16 object-cover rounded-md mb-2 border border-white/10" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setImageFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-primary truncate max-w-[200px]">{imageFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <UploadCloud size={24} className="mb-2 opacity-70" />
                      <p className="text-xs font-medium text-white mb-1">Upload Photo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Drag and Drop */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Showcase Video <span className="text-xs">(Optional)</span></label>
                <div 
                  className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                    dragActiveVideo ? 'border-primary bg-primary/10' : 'border-white/20 bg-black/50 hover:bg-black/30 hover:border-white/40'
                  }`}
                  onDragEnter={handleDragVideo} onDragLeave={handleDragVideo} onDragOver={handleDragVideo} onDrop={handleDropVideo} onClick={() => videoInputRef.current?.click()}
                >
                  <input ref={videoInputRef} type="file" accept="video/mp4,video/webm" onChange={handleChangeVideo} className="hidden" />
                  {videoFile ? (
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="h-16 w-16 bg-primary/20 flex items-center justify-center rounded-md border border-primary/50 mb-2">
                          <Film className="text-primary" />
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setVideoFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-primary truncate max-w-[200px]">{videoFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Film size={24} className="mb-2 opacity-70" />
                      <p className="text-xs font-medium text-white mb-1">Upload Video (MP4)</p>
                    </div>
                  )}
                </div>
              </div>

              <button disabled={isPending} type="submit" className="w-full bg-primary text-black font-semibold rounded-lg p-3 mt-4 hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isPending ? 'Uploading...' : 'Add to Catalog'}
              </button>
            </form>
          </div>
        </div>

        {/* Catalog List */}
        <div className="col-span-1 xl:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-serif text-white mb-6">Live Catalog ({items.length})</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-xl">
                No items in your catalog yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="group relative bg-black/40 border border-white/5 hover:border-white/20 transition-colors rounded-xl p-4 flex gap-4 items-start">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-black/50" />
                      {item.video && (
                        <div className="absolute -bottom-2 -right-2 bg-primary text-black rounded-full p-1 shadow-lg">
                          <Film size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-primary text-sm font-semibold">{item.price}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <button onClick={() => deleteCollectionAction(item.id)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
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
