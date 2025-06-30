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
  IonFab,
  IonFabButton,
  IonIcon,
  IonDatetime,
  ModalController,
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
  styleUrls: ['./habits.page.scss'],
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
    IonListHeader,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonFab,
    IonFabButton,
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

  async loadHabits() {
    const { value } = await Preferences.get({ key: 'habits' });
    this.habits = value ? JSON.parse(value) : [];
  }

  async saveHabits() {
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

  private async scheduleNotification(habit: Habit) {
    // Implementaremos las notificaciones locales en el siguiente paso
    console.log('Scheduling notification for habit:', habit);
  }
}
