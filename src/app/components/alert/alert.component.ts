import { Component } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  protected message!: string;

  success(message:string): void {
    const app_root = document.querySelector("app-root .container")
    const alert = this.createSpan(message, "success", '<i class="fa-solid fa-check"></i> ');
    app_root?.appendChild(alert);
    setTimeout(() => {
      app_root?.removeChild(alert);
    }, 3000);
  }

  error(message:string): void {
    const app_root = document.querySelector("app-root .container")
    const alert = this.createSpan(message, "error", '<i class="fa-solid fa-triangle-exclamation"></i>');
    app_root?.appendChild(alert);
    setTimeout(() => {
      app_root?.removeChild(alert);
    }, 3000);
  }

  private createSpan(message: string, cssClass: string, icon:string) {
    const alert = document.createElement("app-alert")
    const alert_message = document.createElement("span");
    alert_message.classList.add(cssClass);
    alert_message.innerHTML =  `${icon} ${message}`;
    alert.appendChild(alert_message);
    return alert;
  }

}
