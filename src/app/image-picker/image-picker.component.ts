import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.less'],
})
export class ImagePickerComponent {
  @Input() postTitle: string;
  @Input() validMimeType: boolean = false;
  @Input() set postImage(path: string) {
    if (path && typeof path === 'string') {
      this.thumbnail = path;
      this.blobname = path.split('/').reverse()[0];
    }
  }
  @Output() imagePicked: EventEmitter<File> = new EventEmitter();

  @ViewChild('imagePicker') imagePicker: ElementRef<HTMLElement>;
  @ViewChild('imageInput') imageInput: ElementRef<HTMLInputElement>;

  thumbnail: SafeResourceUrl;
  blobname: string;

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.setThumbnail(file);
      this.imagePicked.emit(file);
    }
  }

  onRemoveImage(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.thumbnail = null;
    this.blobname = null;
    this.renderer.setProperty(this.imageInput.nativeElement, 'value', null);
    this.imagePicked.emit(null);
  }

  private setThumbnail(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(
        fileReader.result as string,
      );
      this.blobname = file.name;
    };
    fileReader.readAsDataURL(file);
  }
}
