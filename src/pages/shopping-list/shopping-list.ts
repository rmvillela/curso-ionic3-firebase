import { EditShoppingItemPage } from './../edit-shopping-item/edit-shopping-item';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { AddShoppingPage } from './../add-shopping/add-shopping';

import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    /*
      Display an ActionSheet that gives the user the following options:

      1. Edit the existent ShoppingItem
      2. Delete the ShoppingItem
      3. Cancel the selection
    */
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //send the user to the editShoppingItemPage and pass the key as a parameter
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key })
          }

          /**
           * Navigation stack:
           *
           *  ['ShoppingListPage',
           *    'EditShoppingItemPage',
           *    {shoppingItemId: '-KrQwVyXmYn3YCx_lcll'}
           *  ]
           */

        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();

  }


  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

}
