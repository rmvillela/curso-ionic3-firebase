import { ShoppingListPage } from './../shopping-list/shopping-list';
import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  shoppingItemSubscription: Subscription;

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;

  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //Capture the shoppingItemID as a navParameter

    const shoppingItemId = this.navParams.get('shoppingItemId');

    // set the scope of our firebase object equal to our selected item
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    //subscribe to the object and assign the result to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem);


  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);

    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

}
