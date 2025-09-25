// Copyright (c) 2025, Manju narayana ravuri and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Affected Items', {  
//     item: function(frm, cdt, cdn) {
//         let row = locals[cdt][cdn];

//         if (row.item) {
//             frappe.call({
//                 method: "frappe.client.get_list",
//                 args: {
//                     doctype: "BOM",
//                     filters: { item: row.item, is_active: 1 },
//                     fields: ["name"],
//                     limit_page_length: 1
//                 },
//                 callback: function(r) {
//                     if (r.message && r.message.length > 0) {
//                         row.bom = r.message[0].name;  
//                     } else {
//                         row.bom = "";
//                     }
//                     frm.refresh_field("affected_items"); 
//                 }
//             });
//         }
//     }
// });



frappe.ui.form.on('Affected Items', {
    item: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        if (row.item) {
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "BOM",
                    filters: { 
                        item: row.item, 
                        is_active: 1,
                        is_default: 1  
                    },
                    fields: ["name"],
                    limit_page_length: 1
                },
                callback: function(r) {
                    if (r.message && r.message.length > 0) {
                        row.bom = r.message[0].name;
                    } else {
                        row.bom = "";
                    }
                    frm.refresh_field("affected_items");
                }
            });
        }
    }
});




frappe.ui.form.on('Engineering Change Request', {
    refresh: function(frm) {
        
        frm.clear_custom_buttons();

        if (frm.doc.workflow_state === "Approved") {
            frm.add_custom_button(__('Engineering Change Order'), function() {
                frappe.new_doc('Engineering Change Order', {
                    ecr_link: frm.doc.name
                });
            }, __("Create"));
        }
    }
});








frappe.ui.form.on('Engineering Change Request', {
    onload: function(frm) {
        if (frm.is_new() && !frm.doc.request_date) {
            frm.set_value('request_date', frappe.datetime.get_today());
        }
    }
});
