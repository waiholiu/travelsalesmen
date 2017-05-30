ng build -prod
cp -R dist/* /Users/wai/Dropbox/Apps/Azure/travelSalesmanapp
az appservice web source-control sync --name travelSalesmanapp --resource-group travelSalesmanrg
open http://travelSalesmanapp.azurewebsites.net
