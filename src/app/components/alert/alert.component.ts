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
    const alert = this.createSpan(message, "success");
    app_root?.appendChild(alert);
    setTimeout(() => {
      app_root?.removeChild(alert);
    }, 15000);
    console.log(app_root)
  }

  error(message:string): void {
    const app_root = document.querySelector("app-root .container")
    const alert = this.createSpan(message, "error");
    app_root?.appendChild(alert);
    setTimeout(() => {
      app_root?.removeChild(alert);
    }, 3000);
    console.log(app_root)
  }

  private createSpan(message: string, cssClass: string) {
    const alert = document.createElement("app-alert")
    const alert_message = document.createElement("span");
    alert_message.classList.add(cssClass);
    alert_message.innerHTML = message;
    alert.appendChild(alert_message);
    return alert;
  }

}
