import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.scss']
})
export class MetaDataComponent implements OnInit {

  @Output() data: EventEmitter<{[key: string]: string}> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public metadata: {key: string, value: string}[] = [];

  removeMeta(key: string) {
    this.metadata = this.metadata.filter(m => m.key !== key)
  }

  emit() {
    const myMetadata: {[key: string]: string} = {};
    this.metadata.map(m => {
      myMetadata[m.key] = m.value;
    })
    this.data.emit(myMetadata);
  }

}
