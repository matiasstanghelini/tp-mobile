import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonCheckbox, 
  IonNote, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonItemGroup,
  IonItemDivider,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  ToastController
} from '@ionic/angular/standalone';
// Los íconos se importan directamente en el template
import { Preferences } from '@capacitor/preferences';

interface Habit {
  id: string;
  name: string;
  reminderTime?: string;
  createdAt: Date;
}

interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completedAt: string; // ISO string
}

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItemGroup,
    IonItemDivider,
    IonFab,
    IonFabButton,
    DatePipe
  ]
})
export class TodayPage implements OnInit {
  today: Date = new Date();
  todayString: string;
  habits: Habit[] = [];
  completions: HabitCompletion[] = [];
  
  constructor(private toastController: ToastController) {
    this.todayString = this.formatDate(this.today);
  }

  async ngOnInit() {
    await this.loadHabits();
    await this.loadCompletions();
  }

  get completedHabits(): Habit[] {
    return this.habits.filter(habit => this.isHabitCompleted(habit.id));
  }

  get completedCount(): number {
    return this.completedHabits.length;
  }

  hasHabits(): boolean {
    return this.habits.length > 0;
  }

  isHabitCompleted(habitId: string): boolean {
    return this.completions.some(
      c => c.habitId === habitId && c.date === this.todayString
    );
  }

  getCompletionTime(habitId: string): Date | null {
    const completion = this.completions.find(
      c => c.habitId === habitId && c.date === this.todayString
    );
    return completion ? new Date(completion.completedAt) : null;
  }

  async toggleHabitCompletion(habitId: string, completed: boolean) {
    if (completed) {
      // Add completion
      const completion: HabitCompletion = {
        habitId,
        date: this.todayString,
        completedAt: new Date().toISOString()
      };
      this.completions = [...this.completions, completion];
      
      // Show success message
      const habit = this.habits.find(h => h.id === habitId);
      if (habit) {
        const toast = await this.toastController.create({
          message: `¡${habit.name} marcado como completado!`,
          duration: 2000,
          position: 'bottom'
        });
        await toast.present();
      }
    } else {
      // Remove completion
      this.completions = this.completions.filter(
        c => !(c.habitId === habitId && c.date === this.todayString)
      );
    }
    
    await this.saveCompletions();
  }

  scrollToTop() {
    const content = document.querySelector('ion-content');
    content?.scrollToTop(500);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private async loadHabits() {
    const { value } = await Preferences.get({ key: 'habits' });
    this.habits = value ? JSON.parse(value) : [];
  }

  private async loadCompletions() {
    const { value } = await Preferences.get({ key: 'habitCompletions' });
    this.completions = value ? JSON.parse(value) : [];
  }

  private async saveCompletions() {
    await Preferences.set({
      key: 'habitCompletions',
      value: JSON.stringify(this.completions)
    });
  }
}
