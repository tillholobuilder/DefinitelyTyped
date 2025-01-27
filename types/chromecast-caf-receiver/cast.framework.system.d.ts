import * as events from './cast.framework.events';

export as namespace system;
export enum EventType {
    ALLOW_GROUP_CHANGE = 'allowgroupchange',
    // Fired when there is a system error.
    ERROR = 'error',
    // Fired when system starts to create feedback report.
    FEEDBACK_STARTED = 'feedbackstarted',
    GROUP_CAPABILITIES = 'groupcapabilities',
    MAX_VIDEO_RESOLUTION_CHANGED = 'maxvideoresolutionchanged',
    PROXIMITY_CHANGED = 'proximitychanged',
    // Fired when the system is ready.
    READY = 'ready',
    // Fired when a new sender has connected.
    SENDER_CONNECTED = 'senderconnected',
    // Fired when a sender has disconnected.
    SENDER_DISCONNECTED = 'senderdisconnected',
    // Fired when the application is terminated
    SHUTDOWN = 'shutdown',
    // Fired when the standby state of the TV has changed.
    // This event is related to the visibility chnaged event, as if the TV is in standby
    // the visibility will be false, the visibility is more granular
    // (as it also detects that the TV has selected a different channel)
    // but it is not reliably detected in all TVs,
    // standby can be used in those cases as most TVs implement it.
    STANDBY_CHANGED = 'standbychanged',
    // Fired when the system volume has changed.
    SYSTEM_VOLUME_CHANGED = 'systemvolumechanged',
    // Fired when the visibility of the application has changed
    // (for example after a HDMI Input change or when the TV is turned
    // off/on and the cast device is externally powered).
    // Note that this API has the same effect as the webkitvisibilitychange event raised
    // by your document, we provided it as CastReceiverManager API for convenience and
    // to avoid a dependency on a webkit-prefixed event.
    VISIBILITY_CHANGED = 'visibilitychanged',
}

// Represents the current system state.
export enum SystemState {
    // The application has not been requested to start yet.
    NOT_STARTED = 'notstarted',
    // Application is ready to send and receive messages and it is in foreground.
    READY = 'ready',
    // Application is starting.
    STARTING = 'starting',
    // Application is starting but it is in background.
    STARTING_IN_BACKGROUND = 'startinginbackground',
    // Application is stopping.
    STOPPING = 'stopping',
    // Application is stopping but it is in background.
    STOPPING_IN_BACKGROUND = 'stoppinginbackground',
}

// Types of custom messages.
export enum MessageType {
    // Messages are free-form strings. The application is responsible for encoding/decoding the information transmitted.
    STRING = 'string',
    // Messages are JSON-encoded. The underlying transport will use a JSON encoded string.
    JSON = 'json',
}

// Represents the current standby state reported by the platform. It may be UNKNOWN
// if the cast platform was unable to determine the state yet.
export enum StandbyState {
    NOT_STANDBY = 'notstandby',
    STANDBY = 'standby',
    UNKNOWN = 'unknown',
}

// Represents the disconnect reason.
export enum DisconnectReason {
    // There was a protocol error.
    ERROR = 'error',
    // Connection close was actively requested by the sender application (usually triggered by the user).
    REQUESTED_BY_SENDER = 'requested_by_sender',
    // It is unknown if the sender requested to disconnect gracefully calling close (most likely it didn't,
    // but the close message could have been lost). This normally happens when there is a network timeout
    // or if the sender application crashes or if the sender OS closes the socket.
    UNKNOWN = 'unknown',
}

/**
 * Represent where the receiver was launched from.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system#.LaunchedFrom
 */
export enum LaunchedFrom {
    /**
     * App was launched by Cast V2 request.
     */
    CAST = 'CAST',
    /**
     * App was launched by assistant request (e.g. voice command).
     */
    CLOUD = 'CLOUD',
    /**
     * App was launched by DIAL request.
     */
    DIAL = 'DIAL',
    /**
     * The launch owner could not be determined.
     */
    UNKNOWN = 'UNKNOWN',
}

/**
 * Represents the current visibility state reported by the platform.
 * It may be UNKNOWN if the cast platform was unable to determine the state yet.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system#.VisibilityState
 */
export enum VisibilityState {
    NOT_VISIBLE = 'notvisible',
    UNKNOWN = 'unknown',
    VISIBLE = 'visible',
}

/**
 * Event dispatched by @see{@link CastReceiverManager} when the visibility of the application changes (HDMI input change; TV is turned off).
 */
export class VisibilityChangedEvent {
    constructor(isVisible: boolean);

    /**
     * Whether the Cast device is the active input or not.
     */
    isVisible: boolean;
}

/**
 * Represents the system volume data.
 */
export interface SystemVolumeData {
    /**
     * The level (from 0.0 to 1.0) of the system volume
     */
    level: number;

    /**
     * Whether the system volume is muted or not.
     */
    muted: boolean;
}
/**
 * Event dispatched by @see{CastReceiverManager} when the system volume changes.
 */
export class SystemVolumeChangedEvent extends Event {
    constructor(volume: SystemVolumeData);

    /**
     *  The system volume data
     */
    data: SystemVolumeData;
}
/**
 * Event dispatched by @see{@link CastReceiverManager} when the TV enters/leaves the standby state.
 */
export class StandbyChangedEvent {
    constructor(isStandby: boolean);

    isStandby: boolean;
}
/**
 * Event dispatched by {@link framework.CastReceiverContext} when the application is shutdown.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system.ShutdownEvent
 */
export class ShutdownEvent extends Event {}

/**
 * Event dispatched by {@link framework.CastReceiverContext} when a sender is disconnected.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system.SenderDisconnectedEvent
 */
export class SenderDisconnectedEvent extends Event {
    constructor(senderId: string, userAgent: string, reason: DisconnectReason);
    /**
     * The ID of the sender connected.
     */
    senderId: string;

    /**
     * The user agent of the sender.
     */
    userAgent: string;

    /**
     * The reason the sender was disconnected.
     */
    reason: DisconnectReason;
}

/**
 * Event dispatched by @see{@link CastReceiverManager} when a sender is connected.
 */
export class SenderConnectedEvent extends Event {
    constructor(senderId: string, userAgent: string);
    /**
     * The ID of the sender connected.
     */
    senderId: string;

    /**
     * The user agent of the sender.
     */
    userAgent: string;
}

/**
 * Represents the data of a connected sender device.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system.Sender
 */
export interface Sender {
    /**
     * The sender Id.
     */
    id: string;

    /**
     * Indicate the sender supports large messages (>64KB)
     */
    largeMessageSupported?: boolean | undefined;

    /**
     * The userAgent of the sender.
     */
    userAgent: string;
}

/**
 * Event dispatched by {@link framework.CastReceiverContext} when the system is ready.
 */
export class ReadyEvent extends Event {
    constructor(applicationData: ApplicationData);

    /**
     * The application data
     */
    data: ApplicationData;
}

/**
 * Event dispatched by @see{@link CastReceiverManager} when the system needs to update the restriction on maximum video resolution.
 */
export class MaxVideoResolutionChangedEvent extends Event {
    constructor(height: number);

    /**
     * Maximum video resolution requested by the system. The value of 0 means there is no restriction.
     */
    height: number;
}
/**
 * Event dispatched by {@link framework.CastReceiverContext} when the system
 * starts to create feedback report.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system.FeedbackStartedEvent
 */
export class FeedbackStartedEvent extends Event {}
/** Event dispatched by @see{@link CastReceiverContext} which contains system information. */
export class Event {
    constructor(type: EventType, data?: any);
    type: EventType;
    data?: any;
}

/**
 * Represents the data of the launched application.
 * @see https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.system.ApplicationData
 */
export class ApplicationData {
    constructor();

    /**
     * The application image that is set in Cast Developer Console.
     */
    iconUrl: string;

    /**
     * The application Id.
     */
    id: string;

    /**
     * Indicate where the app was launched from.
     */
    launchedFrom: LaunchedFrom;

    /**
     * The id of the sender that launched the application.
     */
    launchingSenderId: string;

    /**
     * The application name.
     */
    name: string;

    /**
     * The namespaces used by the application.
     */
    namespaces: string[];

    /**
     * The session Id.
     */
    sessionId: number;
}
