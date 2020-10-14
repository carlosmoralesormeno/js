tinymce.init({
    selector: "textarea", theme: "modern", menubar: false,
    language: "es",
    plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons paste textcolor responsivefilemanager code tiny_mce_wiris"
    ],
    image_class_list: [ 
        {title: 'Responsive', value: 'img-fluid'}
    ],
    toolbar1: "bold italic underline strikethrough |  alignleft aligncenter alignright alignjustify | undo redo | image | table | subscript superscript | charmap emoticons media ltr rtl | cut copy paste pastetext ",
    image_advtab: true,
    height: "150",
    forced_root_block : "",

    external_filemanager_path: "/saie/plugins/filemanager/",
    filemanager_title: "Archivos",
    external_plugins: { "filemanager":  "/saie/plugins/filemanager/plugin.min.js" }
});