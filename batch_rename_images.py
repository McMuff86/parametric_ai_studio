# save as batch_rename_images.py
import os
import sys
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".gif"}

def list_images(folder, exts):
  files = []
  for name in os.listdir(folder):
    ext = os.path.splitext(name)[1].lower()
    if ext in exts and os.path.isfile(os.path.join(folder, name)):
      files.append(name)
  # Sort by filename (stable, predictable)
  return sorted(files, key=str.lower)

def build_new_names(files, base, start, digits):
  mapping = []
  for i, name in enumerate(files, start=start):
    ext = os.path.splitext(name)[1].lower()
    new_name = f"{base}_{str(i).zfill(digits)}{ext}"
    mapping.append((name, new_name))
  return mapping

def ensure_unique(mapping):
  seen = set()
  adjusted = []
  for src, dst in mapping:
    candidate = dst
    stem, ext = os.path.splitext(candidate)
    k = 1
    while candidate.lower() in seen:
      candidate = f"{stem}({k}){ext}"
      k += 1
    seen.add(candidate.lower())
    adjusted.append((src, candidate))
  return adjusted

class App(tk.Tk):
  def __init__(self):
    super().__init__()
    self.title("Batch Rename Images")
    self.geometry("720x520")
    self.resizable(True, True)

    self.folder = tk.StringVar()
    self.base = tk.StringVar(value="image")
    self.start = tk.IntVar(value=1)
    self.digits = tk.IntVar(value=2)
    self.exts = tk.StringVar(value="jpg,jpeg,png,webp,tif,tiff,bmp,gif")

    frm = ttk.Frame(self, padding=12)
    frm.pack(fill="both", expand=True)

    # Row 1: Folder picker
    row = ttk.Frame(frm); row.pack(fill="x", pady=(0,8))
    ttk.Label(row, text="Folder:").pack(side="left")
    ttk.Entry(row, textvariable=self.folder).pack(side="left", fill="x", expand=True, padx=6)
    ttk.Button(row, text="Browse…", command=self.browse).pack(side="left")

    # Row 2: Options
    row2 = ttk.Frame(frm); row2.pack(fill="x", pady=6)
    ttk.Label(row2, text="Base name:").grid(row=0, column=0, sticky="w")
    ttk.Entry(row2, textvariable=self.base, width=28).grid(row=0, column=1, sticky="w", padx=(6,18))
    ttk.Label(row2, text="Start #:").grid(row=0, column=2, sticky="w")
    ttk.Spinbox(row2, from_=0, to=9999, textvariable=self.start, width=6).grid(row=0, column=3, sticky="w", padx=(6,18))
    ttk.Label(row2, text="Digits:").grid(row=0, column=4, sticky="w")
    ttk.Spinbox(row2, from_=1, to=6, textvariable=self.digits, width=6).grid(row=0, column=5, sticky="w", padx=(6,18))
    ttk.Label(row2, text="Extensions:").grid(row=0, column=6, sticky="w")
    ttk.Entry(row2, textvariable=self.exts, width=22).grid(row=0, column=7, sticky="w", padx=(6,0))

    # Row 3: Actions
    row3 = ttk.Frame(frm); row3.pack(fill="x", pady=6)
    ttk.Button(row3, text="Preview", command=self.preview).pack(side="left")
    ttk.Button(row3, text="Rename", command=self.rename).pack(side="left", padx=(8,0))

    # Preview box
    self.out = tk.Text(frm, height=14, wrap="none")
    self.out.pack(fill="both", expand=True, pady=(8,0))
    ttk.Scrollbar(frm, orient="vertical", command=self.out.yview).place(relx=1.0, rely=1.0, anchor="se", relheight=0.46)
    self.out.configure(state="disabled")

    # Exclude selector
    ttk.Label(frm, text="Select files to EXCLUDE from renaming (Ctrl/Shift for multi-select):").pack(anchor="w", pady=(10,4))
    lb_frame = ttk.Frame(frm)
    lb_frame.pack(fill="both", expand=False)
    self.exclude = tk.Listbox(lb_frame, selectmode="extended", height=8, exportselection=False)
    self.exclude.pack(side="left", fill="both", expand=True)
    ttk.Scrollbar(lb_frame, orient="vertical", command=self.exclude.yview).pack(side="right", fill="y")
    # Helper buttons for selection
    btns = ttk.Frame(frm)
    btns.pack(fill="x", pady=(6,0))
    ttk.Button(btns, text="Select All", command=lambda: self.exclude.select_set(0, tk.END)).pack(side="left")
    ttk.Button(btns, text="Clear", command=lambda: self.exclude.select_clear(0, tk.END)).pack(side="left", padx=8)

    # Store last mapping for convenience
    self.last_mapping = []

  def browse(self):
    folder = filedialog.askdirectory(title="Choose folder with images")
    if folder:
      self.folder.set(folder)

  def _get_params(self):
    folder = self.folder.get().strip()
    if not folder or not os.path.isdir(folder):
      raise ValueError("Please choose a valid folder.")
    base = self.base.get().strip()
    if not base:
      raise ValueError("Please enter a base name.")
    digits = int(self.digits.get())
    start = int(self.start.get())
    exts = {"." + e.strip().lower().lstrip(".") for e in self.exts.get().split(",") if e.strip()}
    if not exts:
      exts = IMAGE_EXTS
    return folder, base, start, digits, exts

  def preview(self):
    try:
      folder, base, start, digits, exts = self._get_params()
      files = list_images(folder, exts)
      if not files:
        messagebox.showinfo("Preview", "No matching images found.")
        return
      mapping = ensure_unique(build_new_names(files, base, start, digits))
      self.last_mapping = mapping
      # Fill exclude list with original names
      self.exclude.delete(0, tk.END)
      for src, _dst in mapping:
        self.exclude.insert(tk.END, src)
      self._print_preview(folder, mapping)
    except Exception as e:
      messagebox.showerror("Error", str(e))

  def _print_preview(self, folder, mapping):
    self.out.configure(state="normal"); self.out.delete("1.0", "end")
    self.out.insert("end", f"Folder: {folder}\n")
    self.out.insert("end", "Will rename:\n")
    for src, dst in mapping:
      self.out.insert("end", f"  {src}  ->  {dst}\n")
    self.out.configure(state="disabled")

  def rename(self):
    try:
      folder, base, start, digits, exts = self._get_params()
      files = list_images(folder, exts)
      if not files:
        messagebox.showinfo("Rename", "No matching images found.")
        return
      # Prefer last preview mapping (stable order) if available
      if self.last_mapping and len(self.last_mapping) == len(files):
        mapping = list(self.last_mapping)
      else:
        mapping = ensure_unique(build_new_names(files, base, start, digits))

      # Exclude selected originals
      selected = { self.exclude.get(i) for i in self.exclude.curselection() }
      if selected:
        mapping = [m for m in mapping if m[0] not in selected]
        if not mapping:
          messagebox.showinfo("Rename", "All files are excluded. Nothing to rename.")
          return

      # 1) rename to temporary names to avoid collisions
      temp_mapping = []
      for src, dst in mapping:
        src_path = os.path.join(folder, src)
        tmp = dst + ".tmp_ren"
        tmp_path = os.path.join(folder, tmp)
        os.rename(src_path, tmp_path)
        temp_mapping.append((tmp_path, os.path.join(folder, dst)))

      # 2) rename from temporary to final
      for tmp_path, final_path in temp_mapping:
        os.rename(tmp_path, final_path)

      self._print_preview(folder, mapping)
      messagebox.showinfo("Done", f"Renamed {len(mapping)} files.")
    except Exception as e:
      messagebox.showerror("Error", str(e))

if __name__ == "__main__":
  if getattr(sys, "frozen", False):
    App().mainloop()
  else:
    App().mainloop()