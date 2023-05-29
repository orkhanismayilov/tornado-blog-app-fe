import { Component, ElementRef, forwardRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
})
export class ImagePickerComponent implements ControlValueAccessor {
  @Input() postTitle: string;
  @Input() valid: boolean = false;

  @ViewChild('imageInput') imageInput: ElementRef<HTMLInputElement>;

  private file: File | string = null;
  thumbnail: string;
  blobname: string;

  get value(): File | string {
    return this.file;
  }
  set value(fileOrPath: File | string) {
    if (fileOrPath === this.file) {
      return;
    }

    this.file = fileOrPath;

    if (fileOrPath instanceof File || fileOrPath === null) {
      this.onChange(fileOrPath);
      this.onTouched();
      return;
    }

    if (fileOrPath && typeof fileOrPath === 'string') {
      this.thumbnail = fileOrPath;
      this.blobname = fileOrPath.split('/').reverse()[0];
    }
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private renderer: Renderer2) {}

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.value = file;
      this.setThumbnail(file);
    }
  }

  onRemoveImage(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.value = null;
    this.thumbnail = null;
    this.blobname = null;
    this.renderer.setProperty(this.imageInput.nativeElement, 'value', null);
  }

  writeValue(file: File): void {
    this.value = file;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private async setThumbnail(file: File): Promise<void> {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.thumbnail = fileReader.result as string;
      this.blobname = file.name;
    };
    fileReader.readAsDataURL(file);
  }
}
