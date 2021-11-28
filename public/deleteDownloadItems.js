function deleteDownloadItem(order_number, track_id){
    $.ajax({
        url: '/download_items/order_number/' + order_number + '/track_id/' + track_id,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined){
              alert(result.responseText)
            }
            else {
              window.location.reload(true)
            } 
        }
    })
  };