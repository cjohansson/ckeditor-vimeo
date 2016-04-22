/**
 * Vimeo plugin for CKEditor
 *
 * @author Christian Johansson <christian@cvj.se>
 * @license MIT
 */

/**
 * Add plugin to CKEDITOR plugin-list.
 */
CKEDITOR.plugins.add('vimeovideo',
{
    init: function(editor)
    {
        CKEDITOR.dialog.add("vimeovideoDialog", function (c)
        {
            return{title: 'Enter Vimeo video URL', minWidth: 400, minHeight: 75, contents: [
                {id: "tab-basic", label: "Basic Settings", elements: [
                    {type: "text", id: "vimeovideoURL", label: 'URL' }
                ]}
            ], onOk: function ()
            {
                var b = this.getValueOf("tab-basic", "vimeovideoURL").trim().match(/vimeo.com\/([^&$]+)/i);
                if (null == b
                    || "" == b
                    || "" == b[0]
                    || "" == b[1]
                ) {
                    alert('URL was invalid! It should be similar to \n\n\t https://vimeo.com/123456 \n\n Try again!');
                    return false;
                }

                var a = c.document.createElement("iframe");
                a.setAttribute("width", "500");
                a.setAttribute("height", "281");
                a.setAttribute("src", "https://player.vimeo.com/video/" + b[1]);
                a.setAttribute("frameborder", "0");
                a.setAttribute("allowfullscreen", "1");
                c.insertElement(a)

            }}
        });

        // Add command
        editor.addCommand('vimeovideoDialog', new CKEDITOR.dialogCommand("vimeovideoDialog"));

        /// Add UI toolbar button
        editor.ui.addButton('vimeovideo',
        {
            label: 'Embed Vimeo video',
            command: 'vimeovideoDialog',
            icon: this.path + 'images/vimeo-16x16.png'
        });

    }
});
