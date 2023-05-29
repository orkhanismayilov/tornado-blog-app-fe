import { Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostTitleComponent),
      multi: true,
    },
  ],
})
export class PostTitleComponent implements ControlValueAccessor, OnInit {
  @Input('placeholder') placeholder: string = 'Title';
  @ViewChild('title', { static: true }) titleElem: ElementRef<HTMLHeadingElement>;

  private _value: string = '';
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.placeholder) {
      this.renderer.setAttribute(this.titleElem.nativeElement, 'data-placeholder', this.placeholder);
    }
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    if (text) {
      document.execCommand('insertText', false, text);
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
