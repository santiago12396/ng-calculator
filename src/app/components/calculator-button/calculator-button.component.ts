import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './calculator-button.component.html',
  styles: `
    button {
      @apply w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-xl font-light;
    }
    .is-command {
      @apply bg-indigo-700 bg-opacity-20;
    }
    .is-pressed {
      @apply bg-indigo-800 bg-opacity-20;
    }
  `,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class]': 'isDoubleSize() ? "w-2/4" : "w-1/4"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorButtonComponent {
  buttonRef = viewChild<ElementRef<HTMLButtonElement>>('calculatorButton');

  readonly isCommand = input(false, { transform: booleanAttribute });
  readonly isDoubleSize = input(false, { transform: booleanAttribute });

  onClick = output<string>();

  isPressed = signal(false);

  handleClick() {
    if (!this.buttonRef()?.nativeElement) return;
    this.onClick.emit(this.buttonRef()!.nativeElement.innerText.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.buttonRef()?.nativeElement) return;

    const value = this.buttonRef()!.nativeElement.innerText.trim();

    if (value !== key) return;

    this.isPressed.set(true);
    setTimeout(() => this.isPressed.set(false), 100);
  }
}
