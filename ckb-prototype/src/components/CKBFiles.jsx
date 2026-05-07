import { useState } from 'react';
import { Upload, FileText, Pencil, Trash2, X, Check, ChevronDown } from 'lucide-react';
import { FILES, CLIENT } from '../data/mockData';
import BrandScopeTag from './BrandScopeTag';
import DeleteModal from './DeleteModal';

function BrandScopeSelector({ scope, onChange, onCancel, onConfirm, confirmLabel = 'Upload File' }) {
  const [localScope, setLocalScope] = useState(scope || { type: 'client' });
  const [selectedBrands, setSelectedBrands] = useState(
    scope?.type === 'brands' ? scope.brands : []
  );

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const computedScope = () => {
    if (localScope.type === 'client') return { type: 'client' };
    if (localScope.type === 'all-brands') return { type: 'all-brands' };
    return { type: 'brands', brands: selectedBrands };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-800 mb-4">Apply this file to:</p>
      <div className="flex flex-col gap-3">
        {[
          { value: 'client', label: `Whole client (${CLIENT.name})`, desc: 'Applies to client, no brand specificity' },
          { value: 'all-brands', label: 'All Brands', desc: `Applies to ${CLIENT.name} and all its brands` },
          { value: 'brands', label: 'Specific brand(s)', desc: 'Select one or more brands below' },
        ].map(opt => (
          <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="fileScope"
              value={opt.value}
              checked={localScope.type === opt.value}
              onChange={() => setLocalScope({ type: opt.value })}
              className="mt-0.5 accent-[#0057FF]"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>

      {localScope.type === 'brands' && (
        <div className="mt-3 pl-5 flex flex-wrap gap-2">
          {CLIENT.brands.map(brand => (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedBrands.includes(brand)
                  ? 'bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE] font-medium'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-5 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(computedScope())}
          className="px-4 py-2 text-sm font-medium text-white bg-[#0057FF] rounded-lg hover:bg-blue-700 transition-colors"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

export default function CKBFiles({ adminMode }) {
  const [files, setFiles] = useState(FILES);
  const [dragOver, setDragOver] = useState(false);
  const [uploadPhase, setUploadPhase] = useState('idle'); // 'idle' | 'scope'
  const [pendingFile, setPendingFile] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingScope, setEditingScope] = useState(null);

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) { setPendingFile(file); setUploadPhase('scope'); }
  };

  const handleFileInput = e => {
    const file = e.target.files[0];
    if (file) { setPendingFile(file); setUploadPhase('scope'); }
  };

  const handleUploadConfirm = (scope) => {
    const newFile = {
      id: `f${Date.now()}`,
      name: pendingFile?.name || 'uploaded-file.pdf',
      uploadedBy: 'Sarah Mitchell',
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      language: 'English',
      scope,
    };
    setFiles(prev => [newFile, ...prev]);
    setUploadPhase('idle');
    setPendingFile(null);
  };

  const handleDelete = () => {
    setFiles(prev => prev.filter(f => f.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleScopeEdit = (fileId, newScope) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, scope: newScope } : f));
    setEditingScope(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8F9FC] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Upload area */}
        {uploadPhase === 'idle' ? (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 mb-6 text-center transition-colors cursor-pointer
              ${dragOver ? 'border-[#0057FF] bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'}`}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <Upload size={22} className="text-[#0057FF]" />
            </div>
            <p className="font-medium text-gray-800 mb-1">Drop files here or click to browse</p>
            <p className="text-sm text-gray-500">Supported: PDF, DOCX, PPTX, XLSX — max 50MB</p>
            <input id="fileInput" type="file" className="hidden" onChange={handleFileInput} />
          </div>
        ) : (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-3 flex items-center gap-3">
              <FileText size={18} className="text-[#0057FF]" />
              <div>
                <p className="text-sm font-medium text-gray-800">{pendingFile?.name || 'file.pdf'}</p>
                <p className="text-xs text-gray-500">Select brand scope before uploading</p>
              </div>
            </div>
            <BrandScopeSelector
              scope={{ type: 'client' }}
              onCancel={() => { setUploadPhase('idle'); setPendingFile(null); }}
              onConfirm={handleUploadConfirm}
              confirmLabel="Upload File"
            />
          </div>
        )}

        {/* File list */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">{files.length} file{files.length !== 1 ? 's' : ''} uploaded</h3>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 px-5 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>File Name</span>
            <span>Uploaded By</span>
            <span>Date</span>
            <span>Category</span>
            <span>Brand Scope</span>
            {adminMode && <span>Actions</span>}
          </div>

          {/* File rows */}
          {files.map((file, idx) => (
            <div key={file.id}>
              {editingScope === file.id ? (
                <div className="px-5 py-4 bg-blue-50">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Edit brand scope for: <span className="text-[#0057FF]">{file.name}</span></p>
                  <BrandScopeSelector
                    scope={file.scope}
                    onCancel={() => setEditingScope(null)}
                    onConfirm={(scope) => handleScopeEdit(file.id, scope)}
                    confirmLabel="Save Scope"
                  />
                </div>
              ) : (
                <div className={`grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 px-5 py-3.5 items-start
                  ${idx < files.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50 transition-colors`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={14} className="text-[#0057FF] shrink-0" />
                    <button className="text-sm text-[#0057FF] hover:underline truncate text-left">{file.name}</button>
                  </div>
                  <span className="text-sm text-gray-600">{file.uploadedBy}</span>
                  <span className="text-sm text-gray-600">{file.date}</span>
                  <span className="text-sm text-gray-600">{file.category}</span>
                  <BrandScopeTag scope={file.scope} />
                  {adminMode && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setEditingScope(file.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 hover:bg-white transition-colors flex items-center gap-1"
                      >
                        <Pencil size={11} />
                        Edit scope
                      </button>
                      <button
                        onClick={() => setDeleteTarget(file.id)}
                        className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-100 hover:bg-red-50 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {files.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <FileText size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No files uploaded yet. Drop a file above to get started.</p>
            </div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          title="Delete this file?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
