import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VvcEvent, VvcEventType} from './global';

export interface LocalContact {
  id: string;
  pending?: boolean;
  contact?: any;
  onOffer?: boolean;
  lastOffer: {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('adCore', {static: false}) adCore: ElementRef;
  title = 'Infocert';
  uiLoaded = false;
  mediaOffer;
  showUpgradeOffer = false;

  agent;
  jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhbGVzc2FuZHJvIiwiZXhwIjoxNjA2MTQ5MTU2fQ.9KnxtyD8LHhJRqyq5HJH01XQxYGpO_W6S_ShEjMmliY';
  appState: {[key: string]: LocalContact} = {};

  txl8Map = [
    {
      id: 'AD.ISWRITING',
      values: {
        it: { value: '{{user}} sta scrivendo {{nickname}}', state: 'final' },
        en: { value: '{{user}} is writing...', state: 'final' } } },
    {
      id: 'AD.SEND_PH',
      values: {
        it: { value: 'scrivi qui...', state: 'final' },
        en: { value: 'type message here...', state: 'final' } } },
    {
      id: 'AD.SEND_ATTACHMENT_PH',
      values: {
        it: { value: 'aggiungi una descrizione e invia...', state: 'final' },
        en: { value: 'add description and send...', state: 'final' } } },
    {
      id: 'AD.UPLOAD_ERROR',
      values: {
        it: { value: ' - dimensione massima {{filesize}}', state: 'final' },
        en: { value: ' - file size exceeded {{filesize}}', state: 'final' } } },
    {
      id: 'AD.LEFT_BY_CUSTOMER',
      values: {
        it: { value: 'Chat chiusa dal cliente', state: 'final' },
        en: { value: 'The customer close the chat', state: 'final' } } },
    {
      id: 'AD.CHAT_NEW_MESSAGE',
      values: {
        it: { value: 'nuovo messaggio', state: 'final' },
        en: { value: 'new message', state: 'final' } } },
    {
      id: 'AD.INCOMING_CALL',
      values: {
        it: { value: 'Chiamata in arrivo da', state: 'final' },
        en: { value: 'Incoming call from', state: 'final' } } },
    {
      id: 'AD.CALENDAR.TODAY',
      values: {
        it: { value: '[Oggi]', state: 'final' },
        en: { value: '[Today]', state: 'final' } } },
    {
      id: 'AD.CALENDAR.WEEK_DAYS',
      values: {
        it: { value: 'Lunedì,Martedì,Mercoledì,Giovedì,Venerdì,Sabato,Domenica', state: 'final' },
        en: { value: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', state: 'final' } } },
    {
      id: 'AD.CALENDAR.YESTERDAY',
      values: {
        it: { value: '[Ieri]', state: 'final' },
        en: { value: '[Yesterday]', state: 'final' } } },
    {
      id: 'AD.CALENDAR.LAST_WEEK',
      values: {
        it: { value: 'dddd', state: 'final' },
        en: { value: '[Last Week]', state: 'final' } } },
    {
      id: 'AD.CALENDAR.OTHER',
      values: {
        it: { value: 'L', state: 'final' },
        en: { value: 'L', state: 'final' } } },
    {
      id: 'AD.CALENDAR.DATE_FORMAT',
      values: {
        it: { value: 'DD/MM/YYYY', state: 'final' },
        en: { value: 'MM/DD/YYYY', state: 'final' } } }

  ];

  ngOnInit() {
  }
  vivochaEvent(evt) {
    if (evt && evt.detail) {
      const ev: VvcEvent = evt.detail;
      switch (ev.type) {
        case VvcEventType.AGENT:
          this.agent = {...ev.data};
          console.log('AGENT', this.agent);
          break;
        case VvcEventType.NEW: {
          console.log('NEW', ev);
          const contactId = ev.data.contact.id;
          const contact = ev.data.contact;
          if (!this.appState[contactId]) {
            this.appState[contactId] = {id: contactId, pending: true, contact, lastOffer: {}};
          }
          break;
        }
        case VvcEventType.CLEARED: {
          console.log('CLEARED', ev);
          const contactId = ev.data.id;
          delete this.appState[contactId];
          break;
        }
        case VvcEventType.ASSIGNED: {
          console.log('ASSIGNED', ev);
          const contactId = ev.contactId;
          this.onAssigned(contactId);
          break;
        }
        case VvcEventType.LOAD: {
          this.adCore.nativeElement.setTranslationsMap(this.txl8Map, 'it', 'en');
          break;
        }
        case VvcEventType.TRANSLATION_LOADED: {
          this.uiLoaded = true;
          break;
        }
        case VvcEventType.MEDIAOFFER_CONFIRM:
          console.log('CONFIRM?', evt.detail);
          const contactId = evt.detail.contactId;
          this.appState[contactId] = {
            ...this.appState[contactId],
            onOffer: true,
            lastOffer: evt.detail.data
          };
          console.log('currentCustomerMap', this.appState[contactId]);
          break;
        case 'mediachange':
          this.showUpgradeOffer = false;
          break;
        default:
          console.log('VVC-WC', ev);
          break;
      }
    }
  }
  assignContact(contactId) {
    if (this.appState[contactId] && this.appState[contactId].pending) {
      // this.appState[contactId] = {...this.appState[contactId], pending: false };
      this.adCore.nativeElement.sendEvent({type: 'assign', data: contactId});
    }
  }
  onAssigned(contactId) {
    if (this.appState[contactId] && this.appState[contactId].pending) {
      this.appState[contactId] = {...this.appState[contactId], pending: false };
    }
  }
  getPendingContacts(): LocalContact[] {
    return Object.keys(this.appState)
                  .map( k => this.appState[k])
                  .filter((elem: LocalContact) => elem.pending);
  }
  getAssignedContacts(): LocalContact[] {
    return Object.keys(this.appState)
      .map( k => this.appState[k])
      .filter((elem: LocalContact) => !elem.pending);
  }
  acceptOffer(offer, customerId) {
    console.log('should accept offer', offer, customerId);
    this.adCore.nativeElement.sendEvent({ type: 'acceptOffer', contactId: this.appState[customerId].id, data: offer });
    this.appState[customerId] = {...this.appState[customerId], onOffer: false};
  }
  declineOffer(offer, customerId) {
    console.log('should decline offer', offer, customerId);
    this.adCore.nativeElement.sendEvent({ type: 'declineOffer', contactId: this.appState[customerId].id });
    this.appState[customerId] = {...this.appState[customerId], onOffer: false};
  }
}
