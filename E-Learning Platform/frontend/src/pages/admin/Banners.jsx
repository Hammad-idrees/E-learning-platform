import React, { useEffect, useState } from "react";
import {
  deleteBanner,
  listBanners,
  uploadBanners,
} from "../../services/banners";
import BannerUploadForm from "../../components/admin/banners/BannerUploadForm";
import BannerGrid from "../../components/admin/banners/BannerGrid";
import BannerCarousel from "../../components/admin/banners/BannerCarousel";
import {
  Image,
  Upload,
  AlertCircle,
  X,
  Eye,
  Trash2,
  Plus,
  Loader2,
  CheckCircle,
  Info,
} from "lucide-react";

const Banners = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const fetchItems = async () => {
    setError("");
    try {
      const res = await listBanners();
      const data = res?.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load banners");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (files, captions) => {
    setLoading(true);
    setError("");
    try {
      await uploadBanners(files, captions);
      await fetchItems();
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (banner) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    setLoading(true);
    setError("");
    try {
      await deleteBanner(banner._id);
      setItems((prev) => prev.filter((x) => x._id !== banner._id));
    } catch {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                <Image className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Banner Management
                </h1>
                <p className="text-blue-100 text-lg">
                  Upload and manage website banners and promotional images
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Image className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {items.length}
                    </div>
                    <div className="text-sm text-blue-100">Active Banners</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {showPreview ? "Preview" : "Hidden"}
                    </div>
                    <div className="text-sm text-blue-100">Carousel View</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Guidelines */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg mt-1">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 mb-2">
                Banner Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700">
                <div>
                  <p className="font-medium mb-1">Recommended Sizes:</p>
                  <ul className="space-y-1">
                    <li>
                      • <strong>1920×600</strong> (wide format)
                    </li>
                    <li>
                      • <strong>1600×600</strong> (standard)
                    </li>
                    <li>
                      • <strong>1200×400</strong> (compact)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Best Practices:</p>
                  <ul className="space-y-1">
                    <li>• Use high-quality images (min 72 DPI)</li>
                    <li>• Keep file size under 6MB</li>
                    <li>• Center important content</li>
                    <li>• Preview before uploading</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">{error}</span>
              <button
                onClick={clearError}
                className="ml-auto p-1 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Upload New Banners
              </h3>
            </div>
          </div>
          <div className="p-6">
            <BannerUploadForm onSubmit={handleUpload} disabled={loading} />
          </div>
        </div>

        {/* Preview Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Banner Preview
          </h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Carousel Preview */}
        {showPreview && items.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Live Preview
                </h3>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {items.length} banner{items.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="p-6">
              <BannerCarousel
                items={items}
                heightClass="h-[28rem]"
                widthClass="max-w-6xl mx-auto"
                fit="cover"
              />
            </div>
          </div>
        )}

        {/* Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Banner Management
                </h3>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {items.length} total
                </span>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Image className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  No Banners Yet
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Upload your first banner image to get started. Banners will
                  appear in the carousel above and can be managed here.
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById("banner-upload")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Upload First Banner
                </button>
              </div>
            ) : (
              <BannerGrid items={items} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
