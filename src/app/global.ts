export enum VvcEventType {
  // SCRIPT
  SCRIPT_LOADING_ERROR = 'script_loading_error',

  // NOTIFICATIONS
  NOTIFICATION_DISMISS = 'notification_dismiss',
  NOTIFICATION_CONFIRM = 'notification_confirm',
  NOTIFICATION_CANCEL = 'notification_cancel',

  // CHANNEL
  AGENT = 'agent',
  CONNECT = 'connect',
  CONNECTING = 'connecting',
  LOAD = 'load',
  FAILED = 'failed',
  RECONNECT = 'reconnect',
  RECONNECTING = 'reconnecting',
  DISCONNECT = 'disconnect',
  NEW = 'new',
  JOINED = 'joined',
  CLEARED = 'cleared',
  ABANDONED = 'abandoned',
  NOTICE = 'notice',
  QUEUECHANGE = 'queuechange',
  KPI = 'kpi',
  LOADCHANGE = 'loadchange',
  ASSIGNED = 'assigned',
  LEFTBYVISITOR = 'leftbyvisitor',
  LEFTBYAGENT = 'leftbyagent',

  // TRANSLATIONS
  TRANSLATION_LOADED = 'translation_loaded',
  TRANSLATED = 'translated',

  // UPLOAD
  UPLOADINPROGRESS = 'uploadinprogress',
  UPLOADSUCCESS = 'uploadsuccess',
  UPLOADFAILED = 'uploadfailed',
  UPLOADPREVIEW = 'uploadpreview',
  UPLOADCANCELED = 'uploadcanceled',

  // CONTACT
  CONTACT = 'contact',
  RAWMESSAGE = 'rawmessage',
  CONTACT_INFO = 'contact_info',
  LOCALCAPABILITIES = 'localcapabilities',
  CAPABILITIES = 'capabilities',
  ISWRITING = 'iswriting',
  DELIVERING = 'delivering',
  DEL_WARNING = 'del_warning',
  ACK = 'ack',
  READ = 'read',
  TEXT = 'text',
  LOCALTEXT = 'localtext',
  SYSTEM = 'system',
  MEDIAOFFER = 'mediaoffer',
  MEDIAOFFER_CONFIRM = 'mediaoffer_confirm',
  TRANSFERRED = 'transferred',
  LOCATIONCHANGE = 'locationchange',
  MEDIACHANGE = 'mediachange',
  ISIDLE = 'isidle',
  ISACTIVE = 'isactive',
  ISUNREACHABLE = 'isunreachable',
  ISLOST = 'islost',
  LEFT = 'left',
  SYNCED = 'synced',
  RECREADY = 'recready',
  RECSTARTING = 'recstarting',
  RECSTARTED = 'recstarted',
  RECSTOPPING = 'recstopping',

  // CONVERSATION
  CONV_INFO = 'conv_info',
  NO_MORE_CONTACTS = 'no_more_contacts',
  PREVIOUS_TRANSCRIPT = 'previous_transcript',
  CURRENT_TRANSCRIPT = 'current_transcript',

  // TO REMOVE
  CUSTOMER_MESSAGE = 'customer_message',
  AGENT_MESSAGE = 'agent_message',
  AGENT_ATTACHMENT = 'agent_attachment',
  CUSTOMER_ATTACHMENT = 'customer_attachment',

}
export type VvcEvent = {
  type: VvcEventType;
  ref?: string;
  convId?: string;
  contactId?: string;
  data?: any;
};
export enum VvcAction {
  ASSIGN = 'assign',
  LOAD_CONV_INFO = 'load_conv_info',
  LOAD_TRANSCRIPT = 'load_transcript',
  LOAD_PREV_TRANSCRIPT = 'loadPreviousTranscript',
  SEND_READ = 'sendRead',
  SEND_IS_WRITING = 'sendIsWriting',
  SEND_MESSAGE = 'sendMessage',
  SEND_ATTACHMENT = 'sendAttachment',
  CLOSE_CONTACT = 'closeContact',
  CLOSE_CONVERSATION = 'closeConversation'
}
