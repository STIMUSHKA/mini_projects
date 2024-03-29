// hanoi-vizual.component.ts
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hanoi-vizual',
  templateUrl: './hanoi-vizual.component.html',
  styleUrl: './hanoi-vizual.component.scss'
})
export class HanoiVizualComponent implements OnInit {
  @Input() diskCount: number = 5;
  @Input() moves: number[][] = [];
  public tower1: string[] = [];
  public tower2: string[] = [];
  public tower3: string[] = [];
  public width: number = 100;
  public height: number = 200;
  private currentTry: number = 0;
  private tryesArray: boolean[] = [false]
  
  ngOnInit() {
    this.resetTowers();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(123);
    this.tryesArray.push(true)
    this.tryesArray[this.currentTry] = false
    console.log(false);
    
    this.currentTry ++;
    this.resetTowers();
    console.log(this.tower1, this.tower2, this.tower3);
    
    this.height = this.diskCount * 24 + 20;
    this.width = this.diskCount * 20 + 20;

    if ('moves' in changes && !changes['moves'].firstChange) {
      // moves изменился и это не первая инициализация
      this.solve(this.currentTry);
    }

  }

  resetTowers() {
    this.tower1 = Array.from({ length: this.diskCount }, (_, index) => `${(this.diskCount - index) * 20}px`);
    this.tower2 = [];
    this.tower3 = [];
  }

  solve(currentTry: number) {
    this.resetTowers();
    this.executeMoves(currentTry);
  }

  async executeMoves(currentTry: number) {
    for (const move of this.moves) {
      if(!this.tryesArray[currentTry]) {
        break;
      }
      const [from, to] = move;
      if(!this.tryesArray[currentTry]) {
        break;
      }
      await this.delay(1);
      if(!this.tryesArray[currentTry]) {
        break;
      }
      this.moveDisk(from, to);
      if(!this.tryesArray[currentTry]) {
        break;
      }
    }
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  moveDisk(from: number, to: number) {
    const sourceTower = this.getTowerByIndex(from);
    const targetTower = this.getTowerByIndex(to);

    if (sourceTower.length > 0) {
      targetTower.push(sourceTower.pop()!);
    }
  }

  getTowerByIndex(index: number): string[] {
    switch (index) {
      case 1:
        return this.tower1;
      case 2:
        return this.tower2;
      case 3:
        return this.tower3;
      default:
        throw new Error('Invalid tower index');
    }
  }
}