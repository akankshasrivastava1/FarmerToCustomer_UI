import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/component/header/header";
import { Home } from "./pages/home/home";
import { Footer } from "./shared/component/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('farmerToCustomer_Ui');
}
