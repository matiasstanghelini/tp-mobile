import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote
} from '@ionic/angular/standalone';
import { Chart, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonNote,
    BaseChartDirective
  ]
})
export class StatsPage {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  // Datos para el gráfico de dona
  public doughnutChartLabels: string[] = ['Completados', 'Pendientes'];
  public doughnutChartData: ChartData<'doughnut', number[], string> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [75, 25], // Valores de ejemplo: 75% completados, 25% pendientes
        backgroundColor: ['#39ff14', '#2196F3'], // Verde neón para completados (mismo que HABITS), azul para pendientes
        hoverBackgroundColor: ['#45a049', '#1976D2'], // Verde y azul más oscuros al pasar el ratón
        borderWidth: 0
      }
    ]
  };
  
  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // Hace que el gráfico se vea como un donut
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#666666'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 10
      }
    }
  };
  
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  // Evento cuando se hace clic en el gráfico
  public chartClicked({ event, active }: { event?: ChartEvent, active?: any[] }): void {
    if (event) {
      console.log('Chart clicked:', event);
    }
  }

  // Evento cuando se pasa el ratón sobre el gráfico
  public chartHovered({ event, active }: { event?: ChartEvent, active?: any[] }): void {
    if (event) {
      console.log('Chart hovered:', event);
    }
  }
}
