export const ABI = {"address":"0x49b4c7efac4dff17b267191200054b7a3b736db3cd364552edb202ea3cb45884","name":"router","friends":[],"exposed_functions":[{"name":"accept_pending_admin","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer"],"return":[]},{"name":"clear_primary_name","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer"],"return":[]},{"name":"clear_target_addr","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":[]},{"name":"domain_admin_set_subdomain_expiration","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::string::String","u64"],"return":[]},{"name":"domain_admin_set_subdomain_expiration_policy","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::string::String","u8"],"return":[]},{"name":"domain_admin_set_subdomain_transferability","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::string::String","bool"],"return":[]},{"name":"domain_admin_transfer_subdomain","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::string::String","address","0x1::option::Option<address>"],"return":[]},{"name":"get_admin_addr","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":[],"return":["address"]},{"name":"get_expiration","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":["u64"]},{"name":"get_mode","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":[],"return":["u8"]},{"name":"get_owner_addr","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":["0x1::option::Option<address>"]},{"name":"get_pending_admin_addr","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":[],"return":["0x1::option::Option<address>"]},{"name":"get_primary_name","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["address"],"return":["0x1::option::Option<0x1::string::String>","0x1::option::Option<0x1::string::String>"]},{"name":"get_subdomain_expiration_policy","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["0x1::string::String","0x1::string::String"],"return":["u8"]},{"name":"get_target_addr","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":["0x1::option::Option<address>"]},{"name":"is_name_owner","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["address","0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":["bool"]},{"name":"migrate_name","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":[]},{"name":"register_domain","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","u64","0x1::option::Option<address>","0x1::option::Option<address>"],"return":[]},{"name":"register_subdomain","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::string::String","u64","u8","bool","0x1::option::Option<address>","0x1::option::Option<address>"],"return":[]},{"name":"renew_domain","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","u64"],"return":[]},{"name":"set_mode","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","u8"],"return":[]},{"name":"set_pending_admin","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","address"],"return":[]},{"name":"set_primary_name","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::option::Option<0x1::string::String>"],"return":[]},{"name":"set_target_addr","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","0x1::string::String","0x1::option::Option<0x1::string::String>","address"],"return":[]}],"structs":[{"name":"RouterConfig","is_native":false,"abilities":["key"],"generic_type_params":[],"fields":[{"name":"pending_admin_addr","type":"0x1::option::Option<address>"},{"name":"admin_addr","type":"address"},{"name":"mode","type":"u8"},{"name":"signer_cap","type":"0x1::account::SignerCapability"}]}]} as const
