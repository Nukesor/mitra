module.exports = function (successRoute, failureRoute) {
    if (typeof failureRoute === 'undefined') { failureRoute = 'login'; }
    if (typeof successRoute === 'undefined') { successRoute = 'overview'; }
    $.ajax({
        url: '/_loggedIn',
        method:'GET',
        success: function(data){
            if (data.loggedIn){
                window.mitra.router.transitionTo(successRoute);
            }
            else {
                window.mitra.router.transitionTo(failureRoute);
            }
        }
    });
}
