import moment from 'moment';

export class HC {
    static readonly APP_NAME = 'ES_FORM_SERVER';

    static readonly SUCCESS = { success: true };
    static readonly FAILED = { success: false };

    static readonly MINUTES_PER_DAY = 24 * 60;
    static readonly FIRST_DAY = moment([2010, 1, 1]);
    static readonly HUMAN32_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
}

export default HC;