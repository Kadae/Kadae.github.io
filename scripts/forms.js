$(document).ready(function(){

    function send( data, formId, url ){
        jQuery.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: onSuccess(formId),
            error: onError(formId)
        });
    }

    function onError( formId ){
        normalState( formId );
        return function(){ $(formId + ' .info-error').fadeIn(300); }
    }

    function onSuccess( formId ){
        normalState( formId );
        return function(){
            $(formId + ' .inputs').fadeOut(300, function(){
                $(formId + ' .info-success').fadeIn(300);
            });
            $(formId + ' .info-error').fadeOut(300);
        }
    }
    
    function getEmptyFields( data, required ){
        empty = {};
        Object.keys( data )
            .filter( function( k ){
                return required.indexOf(k) !== -1 && data[k].value === '';
            })
            .map( function( k ){
                empty[k] = data[k];
            })

        return empty;
    }

    function markEmptyFields( data ){
        Object.keys( data).map( function( k ){
            data[k].element.addClass("error");
        })
    }

    function cleanMarkedFields( data ){
        Object.keys( data).map( function( k ){
            data[k].element.removeClass("error");
        })
    }

    function getData( formId ){
        var data = {};
        $(formId + ' input, ' + formId + ' textarea').each( function( index, e ){
            var e = $( e );
            if( e.attr('type') !== 'submit' && e.attr('type') !== 'file' ){
                data[e.attr('name')] = { value: e.val(), element: e };
            }else if( e.attr('type') === 'file' && e.get(0).files[0] ) {
                data[e.attr('name')] = { value: e.get(0).files[0], element: e };
            }
        })
        return data;
    }

    function toFormData( data ){
        var d = new FormData();
        for( var k in data ){
            d.append( k, data[k].value );
        }
        return d;
    }

    function inProgressState( formId ){
        $( formId + ' .fui-button.submit').addClass("progress");
    }

    function normalState( formId ){
        $( formId + ' .fui-button.submit').removeClass("progress");
    }

    function handleSubmit( formId, required, url ){
        $(formId).submit( function( e ){
            e.preventDefault();
            var data = getData( formId );
            cleanMarkedFields( data );
            var emptyFields = getEmptyFields( data, required );
            if ( Object.keys( emptyFields).length ){
                markEmptyFields( emptyFields );
            }else{
                inProgressState( formId );
                send( toFormData( data), formId, url );
            }
        });
    }

    handleSubmit( '#formHire', [ 'name', 'email', 'message' ], '/feedback' );
    handleSubmit( '#formResume', [ 'name', 'email', 'message' ], '/resume' );

    $('#formResume .file').change( function( e ){
        var name = e.target.files[0].name;
        $('#formResume .file-name').text( name );
        if( !$('#formResume .description').hasClass('set') ) $('#formResume .description').addClass("set");
    })
    return false;
});