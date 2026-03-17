import { useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { uploadImage } from "@/lib/adminApi";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      onChange(imageUrl);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-border" />
          <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors">
              <Upload size={16} />
            </button>
            <button type="button" onClick={() => onChange("")}
              className="p-2 rounded-full bg-background/90 text-destructive hover:bg-background transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-ring transition-colors cursor-pointer">
          <Image size={28} />
          <span className="text-xs font-medium">Click to upload image</span>
          <span className="text-[10px]">PNG, JPG up to 2MB</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default ImageUpload;
