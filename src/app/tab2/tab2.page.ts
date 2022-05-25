import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import { ModalpagePage } from '../modalpage/modalpage.page';
import { Song } from '../song';
import { SONGS } from '../song-db';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('slides') slides: IonSlides;
  selected_index = 0;

  songs: Song[];

  constructor(public modalController: ModalController, public actionSheetController: ActionSheetController) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songs = SONGS;
  }

  getInfo() {
    this.slides.getActiveIndex().then(data => {
      console.log("active index", data);
      this.selected_index = data;
    });
  }

  async presentModal() {
    this.getInfo();
    let url = this.songs[this.selected_index].url;
    const modal = await this.modalController.create({
      component: ModalpagePage,
      componentProps: { value: url }
    });
    return await modal.present();
  }

  async openMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Song',
      mode: 'ios',
      cssClass: 'action-sheet',
      buttons: [{
        text: 'View live performance',
        icon: 'play',
        cssClass: 'arrow',
        handler: () => {
          console.log('Play clicked');
          this.presentModal();
        }
      }, {
        text: 'Follow',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
