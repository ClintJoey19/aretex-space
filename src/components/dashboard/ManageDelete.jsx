import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

const ManageDelete = ({
  isDeleteAlertDialogOpen,
  setIsDeleteAlertDialogOpen,
  deletFile,
  isSubmitting,
}) => {
  return (
    <>
      <AlertDialog
        open={isDeleteAlertDialogOpen}
        onClose={() => setIsDeleteAlertDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This will delete all the files inside and cannot be undone. Do you
            wish to continue?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsDeleteAlertDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deletFile} disabled={isSubmitting}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageDelete;
