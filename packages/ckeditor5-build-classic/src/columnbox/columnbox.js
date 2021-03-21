import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ColumnBoxEditing from './columnboxediting';
import ColumnBoxUI from './columnboxui';

export default class ColumnBox extends Plugin {
	static get requires() {
		return [ ColumnBoxUI, ColumnBoxEditing ];
	}
}
