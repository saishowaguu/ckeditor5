import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertColumnBoxCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			this.editor.model.insertContent( createColumnBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'columnBox'
		);

		this.isEnabled = allowedIn !== null;
	}
}

function createColumnBox( writer ) {
	const columnBox = writer.createElement( 'columnBox' );
	const columnBoxColumnLeft = writer.createElement( 'columnBoxColumn' );
	const columnBoxColumnRight = writer.createElement( 'columnBoxColumn' );

	writer.append( columnBoxColumnLeft, columnBox );
	writer.append( columnBoxColumnRight, columnBox );

	writer.appendElement( 'paragraph', columnBoxColumnLeft );
	writer.appendElement( 'paragraph', columnBoxColumnRight );

	return columnBox;
}
