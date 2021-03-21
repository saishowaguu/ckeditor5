import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
	toWidget,
	toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertColumnBoxCommand from './insertcolumnboxcommand';

export default class ColumnBoxEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add(
			'insertColumnBox',
			new InsertColumnBoxCommand( this.editor )
		);
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'columnBox', {
			isObject: true,
			allowWhere: '$block'
		} );

		schema.register( 'columnBoxColumn', {
			isLimit: true,
			allowIn: 'columnBox',
			allowContentOf: '$root'
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			model: 'columnBox',
			view: {
				name: 'div',
				classes: 'row'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'columnBox',
			view: {
				name: 'div',
				classes: 'row'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'columnBox',
			view: ( _, { writer: viewWriter } ) => {
				const row = viewWriter.createContainerElement( 'div', {
					class: 'row'
				} );

				return toWidget( row, viewWriter, {
					label: 'Column Layout Widget'
				} );
			}
		} );

		conversion.for( 'upcast' ).elementToElement( {
			model: 'columnBoxColumn',
			view: {
				name: 'div',
				classes: 'col-6'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'columnBoxColumn',
			view: {
				name: 'div',
				classes: 'col-6'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'columnBoxColumn',
			view: ( _, { writer: viewWriter } ) => {
				const column = viewWriter.createEditableElement( 'div', {
					class: 'col-6'
				} );

				return toWidgetEditable( column, viewWriter );
			}
		} );
	}
}
