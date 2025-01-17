import {
  ChangeDetectionStrategy,
  Component,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Enter: '=',
      Escape: 'C',
      Backspace: 'CE',
      '*': 'x',
      '/': '÷',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach(button =>
      button.keyboardPressedStyle(keyValue)
    );
  }
}
