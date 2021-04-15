import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent implements OnInit {
  public editor;
  public editorContent;
  public editorConfig = {
    placeholder: 'Put your things hear'
  };
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.editorContent = this.editorContent;
      // this.editor.disable();
    }, 2800);
  }

  onEditorBlured(quill) {
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {
  }

}
