
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import axios from "axios"


const OwnerPlacesTable = ({ columns, title, data }) => {
    const deletePlace = async (rowData) => {
        let user = localStorage.getItem("user");
        // Show an alert message to confirm the action
        const userConfirmed = window.confirm('Voulez-vous vraiment supprimée cette salle ?');

        // If the user confirms the action, proceed with the API call
        if (userConfirmed) {
            try {
                
                rowData.Availability=false
                let obj={
                    
                        eventPlaceName:rowData.eventPlaceName,
                        eventPlaceAdress:rowData.eventPlaceAdress,
                        ownerPhoneNumber:rowData.ownerPhoneNumber,
                        Description:rowData.Description,
                        price:rowData.Description,
                        Availability:false
                    
                }
                // Make an API call using Axios to your endpoint
                const response = await axios.put(`http://localhost:5000/api/place/${rowData._id}`,obj, {
                    headers: {
                        token: JSON.parse(user).token
                    },
                });
                window.location.reload()
            } catch (error) {

                console.error('API call error:', error);

            }
        } else {

            console.log('Action canceled by the user.');
        }
    };

    const [selectedRow, setSelectedRow] = useState(null);
    const tableIcons = {
        ClearIcon: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
        )),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    };

    const defaultMaterialTheme = createTheme();
    return (
        <div className="row ">

            <div
                className="table_container"
            >
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable className="material-table-box"
                        icons={tableIcons}
                        title={title}
                        columns={columns}
                        data={data}
                        localization={{
                            body: {
                                emptyDataSourceMessage: "Pas d'enregistreent à afficher",
                            },
                            toolbar: {
                                searchTooltip: "Recherche",
                                searchPlaceholder: "Chercher",
                            },
                            pagination: {
                                labelRowsSelect: "lignes",
                                labelRowsPerPage: "Afficher par:",
                                firstTooltip: "Première page",
                                previousAriaLabel: "Page précédente",
                                previousTooltip: "Page précédente",
                                nextAriaLabel: "Page suivante",
                                nextTooltip: "Page suivante",
                                lastAriaLabel: "Dernière page",
                                lastTooltip: "Dernière page",
                            },
                        }}
                        actions={[

                            {
                                icon: () => <CancelIcon />,
                                onClick: (event, rowData) => deletePlace(rowData),
                            },
                        ]}
                        onRowClick={(evt, selectedRow) =>
                            setSelectedRow(selectedRow.tableData.id)
                        }
                        options={{
                            actionsColumnIndex: -1,
                            headerStyle: {
                                backgroundColor: "#FFF",
                            },

                            sorting: false,
                        }}
                    />
                </ThemeProvider>
                <br />
            </div>
        </div>
    );
};

export default OwnerPlacesTable;