import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonNote, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonListHeader,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonDatetime,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';
// Los íconos se importan directamente en el template
import { Preferences } from '@capacitor/preferences';

interface Habit {
  id: string;
  name: string;
  reminderTime?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonDatetime
  ]
})
export class HabitsPage implements OnInit {
  @ViewChild('habitForm') habitForm!: NgForm;
  
  habits: Habit[] = [];
  newHabit: Partial<Habit> = {
    name: '',
    reminderTime: undefined
  };
  showAddHabitForm = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.loadHabits();
  }

  // Default habits that will be shown if no habits exist in storage
  private defaultHabits: Habit[] = [
    {
      id: '1',
      name: 'Beber agua',
      reminderTime: '09:00',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Hacer ejercicio',
      reminderTime: '18:00',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Leer 20 minutos',
      reminderTime: '21:00',
      createdAt: new Date()
    }
  ];

  async loadHabits() {
    const { value } = await Preferences.get({ key: 'habits' });
    
    if (value) {
      // If there are stored habits, merge them with default habits
      const storedHabits: Habit[] = JSON.parse(value);
      // Create a map of stored habits by ID for easy lookup
      const storedHabitsMap = new Map(storedHabits.map(habit => [habit.id, habit]));
      
      // Merge default habits with stored habits, being careful with undefined values
      this.habits = [
        ...this.defaultHabits.map(habit => {
          const storedHabit = storedHabitsMap.get(habit.id);
          // Only merge properties that are not undefined in the stored habit
          return storedHabit ? {
            ...habit,
            name: storedHabit.name || habit.name,
            reminderTime: storedHabit.reminderTime !== undefined ? storedHabit.reminderTime : habit.reminderTime,
            createdAt: storedHabit.createdAt ? new Date(storedHabit.createdAt) : habit.createdAt
          } : habit;
        }),
        // Add any stored habits that aren't in the default list
        ...storedHabits.filter(habit => 
          !this.defaultHabits.some(dh => dh.id === habit.id)
        )
      ];
      
      // Save the merged list back to storage
      await this.saveHabits();
    } else {
      // If no habits in storage, use default habits
      this.habits = [...this.defaultHabits];
      await this.saveHabits(); // Save default habits to storage
    }
  }

  async saveHabits() {
    // Save all habits, including default ones
    await Preferences.set({
      key: 'habits',
      value: JSON.stringify(this.habits)
    });
  }

  async addHabit() {
    if (this.habitForm.valid) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: this.newHabit.name!,
        reminderTime: this.newHabit.reminderTime,
        createdAt: new Date()
      };

      this.habits.push(newHabit);
      await this.saveHabits();
      
      // Limpiar el formulario y ocultarlo
      this.newHabit = { name: '', reminderTime: undefined };
      this.habitForm.resetForm();
      this.showAddHabitForm = false; // Ocultar el formulario después de agregar
      
      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: '¡Hábito agregado correctamente!',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
      
      // Programar notificación si hay hora de recordatorio
      if (newHabit.reminderTime) {
        this.scheduleNotification(newHabit);
      }
    }
  }

  async deleteHabit(habitId: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar hábito',
      message: '¿Estás seguro de que quieres eliminar este hábito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.habits = this.habits.filter(h => h.id !== habitId);
            await this.saveHabits();
            
            const toast = await this.toastController.create({
              message: 'Hábito eliminado',
              duration: 2000,
              position: 'bottom'
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  scrollToTop() {
    const content = document.querySelector('ion-content');
    content?.scrollToTop(500);
  }

  formatReminderTime(timeString: string): string {
    if (!timeString) return '';
    
    // If it's already in HH:MM format, just return it
    if (/^\d{1,2}:\d{2}$/.test(timeString)) {
      return timeString;
    }
    
    // If it's a full date string, extract just the time
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    
    return timeString; // Return as is if we can't parse it
  }

  private async scheduleNotification(habit: Habit) {
    // Implementaremos las notificaciones locales en el siguiente paso
    console.log('Scheduling notification for habit:', habit);
  }
}
