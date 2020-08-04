package devliving.online.cvscanner;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;
import android.util.SparseArray;

import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.Frame;

import org.opencv.android.Utils;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgproc.Imgproc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import devliving.online.cvscanner.util.CVProcessor;

/**
 * Created by user on 10/15/16.
 */
public class DocumentDetector extends Detector<Document> {

    Context mContext;

    public DocumentDetector(Context context) {
        super();
        mContext = context;
    }

    @Override
    public SparseArray<Document> detect(Frame frame) {
        SparseArray<Document> detections = new SparseArray<>();
        if (frame.getBitmap() != null) {
            Document doc = detectDocument(frame);

            if (doc != null) detections.append(frame.getMetadata().getId(), doc);
        }

        return detections;
    }

//    int i = 0;

    Document detectDocument(Frame frame) {
        Size imageSize = new Size(frame.getMetadata().getWidth(), frame.getMetadata().getHeight());
        Mat src = new Mat();
        Utils.bitmapToMat(frame.getBitmap(), src);
        List<MatOfPoint> contours = CVProcessor.findContours(src);

//        Rect rect = CVProcessor.detectBorder(src);
//        if (rect != null) {
//            Log.d("", "");
////            if ((rect.height > 30 && rect.height < 120) && (rect.width > 120 && rect.width < 500)) {
////                Rect rec = new Rect(rect.x, rect.y, rect.width, rect.height);
////                rectangles.add(new Mat(imgSource, rec));
//                Imgproc.rectangle(src, new Point(rect.x, rect.y), new Point(rect.x + rect.width, rect.y + rect.height), new Scalar(0, 0, 255));
//                Bitmap analyzed = Bitmap.createBitmap(src.cols(), src.rows(), Bitmap.Config.ARGB_8888);
//
//
//                File sd = mContext.getCacheDir();
//                File file = new File(sd, "img_" + i++ + ".png");
//                try (FileOutputStream out = new FileOutputStream(file.getAbsolutePath())) {
//                    analyzed.compress(Bitmap.CompressFormat.PNG, 100, out); // bmp is your Bitmap instance
//                    // PNG is a lossless format, the compression factor (100) is ignored
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
////            }
//        }
//        src.release();

        if (!contours.isEmpty()) {
            CVProcessor.Quadrilateral quad = CVProcessor.getQuadrilateral(contours, imageSize);

            if (quad != null) {
                quad.points = CVProcessor.getUpscaledPoints(quad.points, CVProcessor.getScaleRatio(imageSize));

                return new Document(frame, quad);
            }
        }

        return null;
    }
}
