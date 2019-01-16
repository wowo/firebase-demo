import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  meetupers$: Observable<any[]>;

  name = new FormControl('');
  score = new FormControl('');

  isPropagandaMode = false;

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.meetupers$ = this.db.collection('meetupers').valueChanges();
  }

  save() {
    this.db.collection('meetupers').add({
      name: this.name.value,
      score: parseInt(this.score.value),
    }).then(() => {
      this.name.setValue(null);
      this.score.setValue(null);
      console.log('Yass!');
    });
  }

  propagandaMode() {
    if (this.isPropagandaMode) {
      return;
    }

    this.meetupers$ = this.db.collection(
      'meetupers',
      ref => ref.where('score', '>', 3)
    ).valueChanges();
  }
}
